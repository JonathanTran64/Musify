import { useEffect, useContext, useState, useRef } from "react";
import { SongContext } from "../context/SongContext";
import styled from "styled-components";

import spotifyIcon from "../assets/spotify.png";
import rightArrowIcon from "../assets/rightArrow.png";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import SongProgressBar from "../components/SongProgessBar";
import PlayButton from "../components/PlayButton";
import NavBar from "../components/NavBar";

const Answer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [win, setWin] = useState(false);
  const { song, setSong, tries, setTries } = useContext(SongContext);

  const { genre } = useParams();
  const navigate = useNavigate();
  // audio player ref
  const audioAnswerRef = useRef(null);
  const answer = `${song.artistName} - ${song.songName}`;

  const handleNewGame = () => {
    setTries(["", "", "", "", "", ""]);
    setSong("");
    navigate(`/genre/${genre}`);
  };

  useEffect(() => {
    tries.forEach((string) => {
      if (string === answer) {
        setWin(true);
      }
    });
  }, [tries]);

  useEffect(() => {
    audioAnswerRef.current.volume = 0.15;
    audioAnswerRef.current.play();
    setIsPlaying(true);
  }, [audioAnswerRef]);

  return (
    <Container>
      <NavBar genre={genre} />
      <Wrapper>
        <SongInfoWrapper>
          <a href={song.spotifyLink} target="blank">
            <SongInfo>
              <AlbumCover src={song.albumCover} alt="albumCover" />
              <NameArtistWrapper>
                <SongName>{song.songName}</SongName>
                <ArtistName>{song.artistName}</ArtistName>
              </NameArtistWrapper>
              <Spotify src={spotifyIcon} alt="spotifyIcon" />
              <RightArrow src={rightArrowIcon} />
            </SongInfo>
          </a>
        </SongInfoWrapper>

        <TriesWrapper>
          <Message>
            {tries[0] === answer
              ? "LEGEND!"
              : tries[1] === answer
              ? "Amazing!"
              : tries[2] === answer
              ? "Nice Work!"
              : tries[3] === answer
              ? "Good Job!"
              : tries[4] === answer
              ? "Bravo!"
              : tries[5] === answer
              ? "That was close!"
              : ":("}
          </Message>
          <FlexTries>
            {tries.map((string, i) => {
              return (
                <Tries
                  key={string + i}
                  $backColor={
                    string === "S K I P P E D"
                      ? "gray"
                      : string === answer
                      ? "#70e000"
                      : string === ""
                      ? "white"
                      : "#bc4749"
                  }
                ></Tries>
              );
            })}
          </FlexTries>
          {win ? (
            <PlayAgain>You Got It! Press 'NEW GAME' to play again.</PlayAgain>
          ) : (
            <PlayAgain>
              You didn't guess the track! Press 'NEW GAME' to play again.
            </PlayAgain>
          )}
          <NewGame onClick={handleNewGame}>
            <p>N E W</p>
            <p>G A M E</p>
          </NewGame>
        </TriesWrapper>
      </Wrapper>
      <audio ref={audioAnswerRef} src={song.preview} />
      <SongProgressBar isPlaying={isPlaying} seconds={"30s"} display={"none"} />
      <PlayButton
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        seconds={"0:30"}
        audioRef={audioAnswerRef}
      />
    </Container>
  );
};

const Container = styled.div`
  background-color: var(--background);
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 700px;
  height: 400px;
  margin: 0 auto;
  margin-bottom: 170px;

  @media (max-width: 1600px) {
    height: 350px;
  }
`;

const SongInfoWrapper = styled.div`
  display: flex;
  padding-top: 20px;

  a {
    text-decoration: none;
    color: black;
  }
`;

const SongInfo = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--skip);
  border-radius: 3px;
  padding: 10px;
`;

const NameArtistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 515px;
  margin-left: 10px;
`;

const SongName = styled.p`
  font-size: 20px;
  margin: 0px 0px 5px 0px;
`;

const ArtistName = styled.p`
  font-size: 13px;
  margin: 0;
`;

const AlbumCover = styled.img`
  width: 60px;
`;

const Spotify = styled.img`
  width: 80px;
`;

const RightArrow = styled.img`
  width: 15px;
`;

const TriesWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Message = styled.p`
  color: var(--seconds);
  font-weight: 600;
`;

const FlexTries = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 200px;
`;

const Tries = styled.div`
  width: 25px;
  height: 5px;
  background-color: ${(props) => props.$backColor};
  margin-right: 5px;
`;

const PlayAgain = styled.p`
  color: var(--seconds);
`;

const NewGame = styled.button`
  border: none;
  border-radius: 3px;
  background-color: var(--submit);
  cursor: pointer;
  color: var(--background);
  font-weight: bold;
  transition: opacity 0.1s;
  width: 140px;
  height: 45px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  &:hover {
    opacity: 0.9;
  }
`;

export default Answer;
