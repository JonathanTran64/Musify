import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import FuzzySearch from "fuzzy-search";
import GuessBox from "./GuessBox";
import playButtonImage from "../assets/playbutton.png";
import stopButtonImage from "../assets/stopbutton.png";
import NavBar from "./NavBar";

const SongGame = () => {
  const [song, setSong] = useState();
  const { genre } = useParams();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(1);
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

  // PRESS PLAY
  const handlePlay = () => {
    audioRef.current.currentTime = 0;

    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // AUTOMATIC PAUSE AT SPECIFIED SECONDS
  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current && audioRef.current.currentTime >= seconds) {
        audioRef.current.pause();
        setIsPlaying(false);
        audioRef.current.currentTime = 0;
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [seconds, song]);

  // PRESS SKIP
  const handleSkip = () => {
    if (count < 5) {
      const newTries = [...tries];
      newTries[count] = "S K I P P E D";
      setTries(newTries);
    }
    setSkip((skip += 1));
    setCount((count += 1));
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
      count < 5
    ) {
      const newTries = [...tries];
      newTries[count] = inputGuess.trim();
      setTries(newTries);
      setSkip((skip += 1));
      setCount((count += 1));
      setSeconds(seconds + count);
      setInputGuess("");
    } else {
      navigate(`/song/${genre}/${song.songName}`);
    }
    console.log(inputGuess.trimEnd(), `${song.artistName} - ${song.songName}`);
  };

  return (
    <Container>
      <NavBar></NavBar>
      <Wrapper>
        {tries.map((tryAnswer, index) => (
          <GuessBox
            key={index}
            active={count === index ? "active" : "not-active"}
            answer={tryAnswer}
          />
        ))}

        {song ? (
          <>
            <audio ref={audioRef} src={song.preview} />

            {/* AUDIO BAR */}
            <ProgressBar>
              <Skipped
                $width={"50px"}
                $backColor={count >= 0 ? "lightgray" : "none"}
              ></Skipped>
              <Skipped
                $width={"95px"}
                $backColor={count >= 1 ? "lightgray" : "none"}
              ></Skipped>
              <Skipped
                $width={"185px"}
                $backColor={count >= 2 ? "lightgray" : "none"}
              ></Skipped>
              <Skipped
                $width={"315px"}
                $backColor={count >= 3 ? "lightgray" : "none"}
              ></Skipped>
              <Skipped
                $width={"487px"}
                $backColor={count >= 4 ? "lightgray" : "none"}
              ></Skipped>
              <Skipped
                $width={"700px"}
                $backColor={count >= 5 ? "lightgray" : "none"}
              ></Skipped>
              {/* RED BAR ANIMATION */}
              <Player $isPlaying={isPlaying}></Player>
              <LineWrapper>
                <Line
                  $width={"50px"}
                  $backColor={count >= 1 ? "lightgray" : "none"}
                ></Line>
                <Line $width={"95px"}></Line>
                <Line $width={"185px"}></Line>
                <Line $width={"315px"}></Line>
                <Line $width={"487px"}></Line>
              </LineWrapper>
            </ProgressBar>

            {/* PLAY BUTTON */}
            <PlayButtonWrapper>
              <PlayButton onClick={handlePlay}>
                <PlayButtonImage
                  src={isPlaying ? stopButtonImage : playButtonImage}
                  alt="playButton"
                  $left={isPlaying ? "0px" : "3px"}
                />
              </PlayButton>
            </PlayButtonWrapper>

            {/* SUGGESTIONS */}
            <ButtonSuggestionsWrapper>
              {suggestions
                ? suggestions.slice(0, 10).map((song, i) => {
                    return (
                      <div key={song + i}>
                        <div>
                          <ButtonSuggestions
                            onClick={() => {
                              setInputGuess(song + " ");
                            }}
                          >
                            {song}
                          </ButtonSuggestions>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </ButtonSuggestionsWrapper>

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
                <button onClick={handleSkip}>S K I P ( + {skip} s )</button>
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
  margin-top: 200px;
  margin-bottom: 10px;
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
  border-right: 1px black solid;
`;

const PlayButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;
const PlayButton = styled.button`
  padding: 10px 12px;
  border-radius: 50px;
  cursor: pointer;
`;

const PlayButtonImage = styled.img`
  position: relative;
  left: ${(props) => props.$left};
  width: 35px;
`;

const ButtonSuggestionsWrapper = styled.div`
  position: absolute;
  bottom: 287px;
  width: 700px;

  @media (max-height: 768px) {
    bottom: 102px;
  }

  @media (max-height: 900px) {
    bottom: 233px;
  }

  @media (max-height: 1024px) {
    bottom: 358px;
  }

  @media (max-height: 1080px) {
    bottom: 414px;
  }
`;
const ButtonSuggestionsWrapper2 = styled.div``;
const ButtonSuggestions = styled.button`
  display: flex;
  padding: 7px 0px 7px 20px;
  width: 700px;
  height: 33px;
  border: 1px black solid;
  border-bottom: 0px;
  background-color: lightgray;
  cursor: pointer;

  &:hover {
    background-color: white;
  }
`;

const InputGuess = styled.input`
  width: 675px;
  height: 40px;
  padding-left: 20px;
`;

const WrapperSkipSubmit = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

export default SongGame;
