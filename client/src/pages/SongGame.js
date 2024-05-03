import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import FuzzySearch from "fuzzy-search";
// images
import playButtonImage from "../assets/playbutton.png";
import stopButtonImage from "../assets/stopbutton.png";
// components
import NavBar from "../components/NavBar";
import GuessBox from "../components/GuessBox";
import SongProgressBar from "../components/SongProgessBar";
import InputSkipSubmit from "../components/InputSkipSubmit";

const SongGame = () => {
  // fetched song
  const [song, setSong] = useState();

  const [message, setMessage] = useState("");
  // checking if audio is playing
  const [isPlaying, setIsPlaying] = useState(false);
  // number of seconds allowed to play
  const [seconds, setSeconds] = useState(1);
  // fetch all the songs from the given genre
  const [allSongs, setAllSongs] = useState([]);
  // user input
  const [inputGuess, setInputGuess] = useState("");
  // array of songs that matches the users input
  const [suggestions, setSuggestion] = useState([]);
  // each try will have their answer match their index
  const [tries, setTries] = useState(["", "", "", "", "", ""]);
  // count number of tries
  let [count, setCount] = useState(0);

  // param = genre : genre chosen
  const { genre } = useParams();
  // audio player ref
  const audioRef = useRef(null);

  // fetch the random song/songs from the chosen genre
  useEffect(() => {
    const getSong = async () => {
      try {
        const response = await fetch(`/${genre}`);
        const { song, songsArray, message } = await response.json();
        console.log(song);
        setSong(song);
        setMessage(message);
        setAllSongs(songsArray);
        // Set Volume
        audioRef.current.volume = 0.15;
      } catch (error) {
        console.log(error);
      }
    };

    getSong();
  }, []);

  // Fuzzy search and set suggestions to an array that matches the users input
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

  // PRESS PLAY BUTTON OR STOP
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

  return (
    <Container>
      <GuessBoxWrapper>
        {/* GUESS BOXES */}
        {tries.map((tryAnswer, index) => (
          <GuessBox
            key={index}
            active={count === index ? "active" : "not-active"}
            answer={tryAnswer}
          />
        ))}
      </GuessBoxWrapper>
      {song ? (
        <>
          <audio ref={audioRef} src={song.preview} />

          {/* SUGGESTIONS */}
          <ButtonSuggestionsWrapper>
            <Flex>
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
            </Flex>
          </ButtonSuggestionsWrapper>

          <SongProgressBar isPlaying={isPlaying} count={count} />

          <SecondsPLayButtonWrapper>
            <p>0:00</p>
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
            <p>0:16</p>
          </SecondsPLayButtonWrapper>

          <InputSkipSubmit
            song={song}
            seconds={seconds}
            setSeconds={setSeconds}
            tries={tries}
            setTries={setTries}
            count={count}
            genre={genre}
            inputGuess={inputGuess}
            setInputGuess={setInputGuess}
            setCount={setCount}
          />
        </>
      ) : (
        <Loading>Loading player...</Loading>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding-top: 30px;
  overflow-x: hidden;
  background-color: #e9c46a;
  height: 100vh;
`;

const GuessBoxWrapper = styled.div`
  margin: 0 auto;
  margin-bottom: 200px;
  width: 700px;
`;

const SecondsPLayButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 700px;
  margin: 10px auto;
`;

const PlayButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const PlayButton = styled.button`
  background-color: transparent;
  padding: 10px 12px;
  border-radius: 50px;
  cursor: pointer;
`;

const PlayButtonImage = styled.img`
  position: relative;
  left: ${(props) => props.$left};
  top: 1px;
  width: 35px;
`;

//Suggestions styling
const Flex = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
`;

const ButtonSuggestionsWrapper = styled.div`
  position: relative;
  z-index: 99;
  top: 99px;
  display: flex;
  height: 3px;
  width: 700px;
  margin: 0 auto;
`;

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

const Loading = styled.h3`
  margin: 0 auto;
  width: 200px;
`;
export default SongGame;
