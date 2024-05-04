import { useEffect, useContext, useState, useRef } from "react";
import { SongContext } from "../context/SongContext";
import styled from "styled-components";

import spotifyIcon from "../assets/spotify.png";
import rightArrowIcon from "../assets/rightArrow.png";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import SongProgressBar from "../components/SongProgessBar";
import PlayButton from "../components/PlayButton";

const Answer = () => {
  // audio player ref
  const audioAnswerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { song, setSong, tries, setTries } = useContext(SongContext);
  const answer = `${song.artistName} - ${song.songName}`;
  const { genre } = useParams();
  const navigate = useNavigate();

  const handleNewGame = () => {
    setTries(["", "", "", "", "", ""]);
    setSong("");
    navigate(`/genre/${genre}`);
  };

  useEffect(() => {
    audioAnswerRef.current.volume = 0.15;
    audioAnswerRef.current.play();
    setIsPlaying(true);
  }, [audioAnswerRef]);

  return (
    <Container>
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
          <p>Good Job!</p>
          <FlexTries>
            {tries.map((string) => {
              return (
                <Tries
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
          <p>You Got It!</p>
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
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlexTries = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const Tries = styled.div`
  width: 25px;
  height: 5px;
  background-color: ${(props) => props.$backColor};
  margin-right: 5px;
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
