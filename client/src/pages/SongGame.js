import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import FuzzySearch from "fuzzy-search";
import axios from "axios";

//images
import volumeIcon from "../assets/volumeIcon.png";

// components
import GuessBox from "../components/GuessBox";
import SongProgressBar from "../components/SongProgessBar";
import InputSkipSubmit from "../components/InputSkipSubmit";
import { SongContext } from "../context/SongContext";
import PlayButton from "../components/PlayButton";
import NavBar from "../components/NavBar";
import Streak from "../components/Streak";
import Footer from "../components/Footer";
import LeaderBoard from "../components/LeaderBoard";
import CustomBox from "../components/CustomBox";

const SongGame = () => {
  // number of seconds allowed to play
  const [seconds, setSeconds] = useState(1);
  // fetch all the songs from the given genre
  const [allSongs, setAllSongs] = useState([]);
  // user input
  const [inputGuess, setInputGuess] = useState("");
  // array of songs that matches the users input
  const [suggestions, setSuggestion] = useState([]);
  // checking if audio is playing
  const [isPlaying, setIsPlaying] = useState(false);
  // flag for when server has to launch / no one has been on for a while
  const [firstLoad, setFirstLoad] = useState(false);
  // count number of tries
  let [count, setCount] = useState(0);

  // param = genre : genre chosen
  const { genre } = useParams();
  // audio player ref
  const audioRef = useRef(null);

  const {
    song,
    setSong,
    tries,
    setTries,
    customGenre,
    customPlaylist,
    playlist,
    volume,
    setVolume,
  } = useContext(SongContext);

  // fetch the random song/songs from the chosen genre
  useEffect(() => {
    const getSong = async () => {
      try {
        if (genre === "CUSTOM") {
          return;
        }
        const response = await axios.get(
          `https://musifybackend.onrender.com/${genre}`
        );
        const { song, songsArray } = await response.data;
        setSong(song);
        setAllSongs(songsArray);
        setFirstLoad(false);
        // Set Volume
        audioRef.current.volume = volume;
      } catch (error) {
        console.log(error);
      }
    };

    getSong();
  }, []);

  // Post Custom Playlist
  useEffect(() => {
    const getCustom = async () => {
      try {
        if (customPlaylist) {
          const response = await axios.post(
            `https://musifybackend.onrender.com/custom`,
            {
              playlists: playlist,
            }
          );
          const { song, songsArray } = await response.data;
          setSong(song);
          setAllSongs(songsArray);
          setFirstLoad(false);
          // Set Volume
          audioRef.current.volume = volume;
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCustom();
  }, [customPlaylist]);

  // First time loading
  useEffect(() => {
    if (!song && !customGenre) {
      setTimeout(() => {
        setFirstLoad(true);
      }, 5000);
    }
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

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <>
      <NavBar genre={genre} />
      <Container>
        <CustomBox />
        <Streak
          genre={
            genre === "HIP-HOP" ? "hiphop" : genre === "R&B" ? "rnb" : genre
          }
        />
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
        <LeaderBoard
          genre={
            genre === "HIP-HOP" ? "hiphop" : genre === "R&B" ? "rnb" : genre
          }
        />
        {song ? (
          <>
            <audio ref={audioRef} src={song.preview} />
            {/* SUGGESTIONS */}
            <ButtonSuggestionsWrapper>
              <FlexSuggestions>
                {suggestions
                  ? suggestions.slice(0, 10).map((song, i) => {
                      return (
                        <div key={song + i}>
                          <div>
                            <ButtonSuggestions
                              onClick={() => {
                                setInputGuess(song + " ");
                              }}>
                              {song}
                            </ButtonSuggestions>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </FlexSuggestions>
            </ButtonSuggestionsWrapper>
            <SongProgressBar
              isPlaying={isPlaying}
              count={count}
              seconds={"16s"}
            />
            <PlayButton
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              seconds={"0:16"}
              audioRef={audioRef}
            />
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
            <SliderContainer>
              <Slider>
                <img src={volumeIcon} alt="volumeIcon" />
                <VolumeSlider
                  type="range"
                  id="volumeSlider"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </Slider>
            </SliderContainer>
            <Footer />
          </>
        ) : (
          <>
            <FirstLoad $display={firstLoad ? "block" : "none"}>
              If this is your first time loading please wait around a minute
              while we start the server. Thank you and enjoy MUSIFY!
            </FirstLoad>
            <Loading>Loading player...</Loading>
          </>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-top: 30px;
  background-color: var(--background);
  height: 95vh;
`;

const GuessBoxWrapper = styled.div`
  margin: 0 auto;
  margin-bottom: 200px;
  width: 700px;

  @media (max-width: 1600px) {
    margin-bottom: 100px;
  }
`;

//Suggestions styling
const FlexSuggestions = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
`;

const ButtonSuggestionsWrapper = styled.div`
  position: relative;
  z-index: 99;
  top: 96px;
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
  border: 1px #6c757d solid;
  border-bottom: 0px;
  background-color: var(--background);
  color: var(--suggestText);
  cursor: pointer;

  &:hover {
    background-color: var(--notSeconds);
  }
`;

const Loading = styled.h3`
  margin: 0 auto;
  width: 200px;
  color: white;
`;

const FirstLoad = styled.h3`
  margin: 0 auto;
  width: 1100px;
  color: var(--submit);
  margin-bottom: 20px;
  display: ${(props) => props.$display};
`;

const SliderContainer = styled.div`
  width: 100%;
`;

const Slider = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 300px;
  margin: 0 auto;
  bottom: 35px;

  img {
    width: 30px;
    margin-right: 10px;
  }
`;

const VolumeSlider = styled.input`
  width: 300px;
  -webkit-appearance: none;
  appearance: none;
  height: 5px;
  background: var(--notSeconds);
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  border-radius: 10px;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: #ccff33;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`;
export default SongGame;
