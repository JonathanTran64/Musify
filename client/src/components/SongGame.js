import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import FuzzySearch from "fuzzy-search";
import GuessBox from "./GuessBox";

const SongGame = () => {
  const [song, setSong] = useState();
  const { genre } = useParams();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(1000);
  const [allSongs, setAllSongs] = useState([]);
  const [inputGuess, setInputGuess] = useState("");
  const [suggestions, setSuggestion] = useState([]);
  const [tries, setTries] = useState(["", "", "", "", "", ""]);
  let [count, setCount] = useState(0);
  let [skip, setSkip] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const getAllSong = async () => {
      try {
        const response = await fetch(`/${genre}All`);
        const { songArray } = await response.json();
        console.log(songArray);
        setAllSongs(songArray);
      } catch (error) {
        console.log(error);
      }
    };
    getAllSong();
  }, []);

  useEffect(() => {
    const getSong = async () => {
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

    getSong();
  }, []);

  useEffect(() => {
    const searcher = new FuzzySearch(allSongs, [], { sort: true });
    const result = searcher.search(inputGuess);
    if (!inputGuess) {
      setSuggestion(null);
    } else {
      setSuggestion(result);
    }

    console.log(result);
  }, [inputGuess]);

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
    if (count < 5000) {
      const newTries = [...tries];
      newTries[count / 1000] = "S K I P P E D";
      setTries(newTries);
    }

    setSkip((skip += 1));
    setCount((count += 1000));
    setSeconds(seconds + count);
  };

  // SUBMIT
  const handleSubmit = () => {
    // No Input
    if (!inputGuess.trim()) {
      return;
    }

    if (
      inputGuess.trim() !== `${song.artistName} - ${song.songName}` &&
      count < 5000
    ) {
      const newTries = [...tries];
      newTries[count / 1000] = inputGuess.trim();
      setTries(newTries);
      setSkip((skip += 1));
      setCount((count += 1000));
      setSeconds(seconds + count);
      setInputGuess("");
    } else {
      navigate(`/song/${genre}/${song.songName}`);
    }
    console.log(inputGuess.trimEnd(), `${song.artistName} - ${song.songName}`);
  };

  return (
    <Container>
      <Wrapper>
        {tries.map((tryAnswer, index) => (
          <GuessBox
            key={index}
            active={count === index * 1000 ? "active" : "not-active"}
            answer={tryAnswer}
          />
        ))}

        {song ? (
          <>
            <StyledAudio ref={audioRef} src={song.preview} />

            {/* AUDIO BAR */}
            <ProgressBar>
              <Skipped
                $width={"45px"}
                $backColor={count >= 0 ? "lightgray" : "none"}
              ></Skipped>
              <Skipped
                $width={"90px"}
                $backColor={count >= 1000 ? "lightgray" : "none"}
              ></Skipped>
              <Skipped
                $width={"175px"}
                $backColor={count >= 2000 ? "lightgray" : "none"}
              ></Skipped>
              <Skipped
                $width={"305px"}
                $backColor={count >= 3000 ? "lightgray" : "none"}
              ></Skipped>
              <Skipped
                $width={"480px"}
                $backColor={count >= 4000 ? "lightgray" : "none"}
              ></Skipped>
              <Skipped
                $width={"700px"}
                $backColor={count >= 5000 ? "lightgray" : "none"}
              ></Skipped>
              <Player $isPlaying={isPlaying}></Player>
              <LineWrapper>
                <Line
                  $width={"45px"}
                  $backColor={count >= 1000 ? "lightgray" : "none"}
                ></Line>
                <Line $width={"90px"}></Line>
                <Line $width={"175px"}></Line>
                <Line $width={"305px"}></Line>
                <Line $width={"480px"}></Line>
              </LineWrapper>
            </ProgressBar>
            <PlayButton onClick={handlePlay}>Play</PlayButton>

            {/* SUGGESTIONS */}
            <div>
              {suggestions
                ? suggestions.slice(0, 10).map((song, i) => {
                    return (
                      <button
                        key={song + i}
                        onClick={() => {
                          setInputGuess(song + " ");
                        }}
                      >
                        {song}
                      </button>
                    );
                  })
                : ""}
            </div>

            {/* GUESS INPUT */}
            <div>
              <InputGuess
                type="text"
                placeholder="Know the song?"
                value={inputGuess}
                onChange={(e) => {
                  setInputGuess(e.target.value);
                }}
              ></InputGuess>
            </div>

            {/* SKIP BUTTON */}
            <WrapperSkipSubmit>
              {skip !== 6 ? (
                <button disabled={isPlaying} onClick={handleSkip}>
                  S K I P ( + {skip} s )
                </button>
              ) : (
                <Link to={`/song/${genre}/${song.songName}`}>
                  <button>S K I P</button>
                </Link>
              )}

              <button onClick={handleSubmit}>SUBMIT</button>
            </WrapperSkipSubmit>
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

const StyledAudio = styled.audio`
  width: 100%;
  margin-bottom: 10px;
`;

const Skipped = styled.div`
  position: absolute;
  width: ${(props) => props.$width};
  height: 15px;
  background-color: ${(props) => props.$backColor};
  z-index: -99;
`;

const ProgressBar = styled.div`
  border: 1px solid black;
  height: 15px;
`;

const Player = styled.div`
  background-color: red;
  width: 5px;
  height: 100%;
  z-index: 999;
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
  /* background-color: ${(props) => props.$backColor}; */
  border-right: 1px black solid;
`;

const PlayButton = styled.button``;

const InputGuess = styled.input`
  width: 675px;
  height: 40px;
  padding-left: 20px;
`;

const WrapperSkipSubmit = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default SongGame;
