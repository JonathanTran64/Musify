import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const SongGame = () => {
  const [song, setSong] = useState();
  const { genre } = useParams();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(1000);
  let [count, setCount] = useState(0);
  let [skip, setSkip] = useState(1);

  useEffect(() => {
    const getKpop = async () => {
      try {
        const response = await fetch(`/${genre}`);
        const data = await response.json();
        console.log(data.song);
        setSong(data.song);
        // Set Volume
        audioRef.current.volume = 0.15;
      } catch (error) {
        console.log(error);
      }
    };

    getKpop();
  }, []);

  const handlePlay = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);

    setTimeout(() => {
      audioRef.current.pause();
      setIsPlaying(false);
    }, seconds);
  };

  const handleSkip = () => {
    if (count === 6000) {
    }

    setSkip((skip += 1));
    setCount((count += 1000));
    setSeconds(seconds + count);
    console.log(count);
    console.log(seconds);
  };

  return (
    <Container>
      <Wrapper>
        <GuessBox></GuessBox>
        <GuessBox></GuessBox>
        <GuessBox></GuessBox>
        <GuessBox></GuessBox>
        <GuessBox></GuessBox>
        <GuessBox></GuessBox>

        {song ? (
          <>
            <StyledAudio ref={audioRef} src={song.preview} />

            <ProgressBar>
              <Player $isPlaying={isPlaying}></Player>
              <LineWrapper>
                <Line $width={"45px"}></Line>
                <Line $width={"90px"}></Line>
                <Line $width={"175px"}></Line>
                <Line $width={"305px"}></Line>
                <Line $width={"480px"}></Line>
              </LineWrapper>
            </ProgressBar>
            <PlayButton onClick={handlePlay}>Play</PlayButton>

            <div>
              <input type="text"></input>
            </div>
            <div>
              {skip !== 6 ? (
                <button disabled={isPlaying} onClick={handleSkip}>
                  S K I P ( + {skip} s )
                </button>
              ) : (
                <Link to={`/song/${genre}/${song.songName}`}>
                  <button>S K I P</button>
                </Link>
              )}
            </div>
          </>
        ) : (
          <h1>load...</h1>
        )}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  width: 700px;
`;

const GuessBox = styled.div`
  margin-bottom: 5px;
  border: 1px black solid;
  height: 35px;
`;

const StyledAudio = styled.audio`
  width: 100%;
  margin-bottom: 10px;
`;

const SongBar = styled.input`
  width: 100%;
  height: 100px;
  background-color: red;
`;

const ProgressBar = styled.div`
  border: 1px solid black;
  height: 15px;
`;

const Player = styled.div`
  background-color: red;
  width: 5px;
  height: 100%;
  z-index: 99;
  animation: ${({ $isPlaying }) => ($isPlaying ? "slide" : "none")} 16s linear;

  @keyframes slide {
    from {
      width: 5px;
    }
    to {
      width: 100%;
    }
  }
`;

const LineWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  bottom: 15px;
`;
const Line = styled.div`
  position: absolute;
  height: 100%;
  width: ${(props) => props.$width};
  background-color: none;
  border-right: 1px black solid;
`;

const PlayButton = styled.button``;

export default SongGame;
