import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import styled from "styled-components";
import axios from "axios";
// images
import spotify from "../assets/spotify.png";
import trashcanIcon from "../assets/trashcan.png";
import loadingGif from "../assets/loading.gif";
//component
import NavBar from "./NavBar";
// context
import { UserContext } from "../context/UserContext";

const Favorite = () => {
  const [favoritesArray, setFavoritesArray] = useState([]);
  const [loading, setLoading] = useState(null); // State to track which item is loading
  const favoriteRefs = useRef([]);
  const { user } = useContext(UserContext);

  // Get user Favorites
  useEffect(() => {
    const getFavorites = async () => {
      if (user) {
        const response = await axios.get(`/${user.id}/favorites`);
        const { favorites } = await response.data;
        setFavoritesArray(favorites);
      }
    };
    getFavorites();
  }, [user]);

  useEffect(() => {
    // Set default volume for each audio element when they are first referenced
    favoriteRefs.current.forEach((audio) => {
      if (audio) {
        audio.volume = 0.15;
      }
    });
  }, [favoritesArray]);

  // Remove from favorite (PATCH)
  const removeFavorite = async (preview) => {
    setLoading(preview);
    if (user) {
      await axios.patch(`/${user.id}/removeFavorite`, { preview });
      setFavoritesArray(
        favoritesArray.filter((song) => song.preview !== preview)
      );
      setLoading(null); // Reset loading state
    }
    toast.success("Removed from your favorites!");
  };

  return (
    <>
      <NavBar />
      <Container $height={favoritesArray.length !== 0 ? "100%" : "100vh"}>
        <FlexSong>
          {user && favoritesArray.length !== 0 ? (
            favoritesArray.map((obj, index) => (
              <SongContainer key={obj.songName + obj.artistName}>
                <FlexSongName>
                  <img src={obj.albumCover} alt="album cover" />
                  <div>
                    <p>{obj.songName}</p>
                    <p>{obj.artistName}</p>
                  </div>
                </FlexSongName>
                <AudioPreview
                  controls
                  ref={(el) => (favoriteRefs.current[index] = el)}
                  src={obj.preview}
                />
                <IconFlex>
                  <Link to={obj.spotifyLink} target="blank">
                    <SpotifyIcon src={spotify} alt="spotifyIcon" />
                  </Link>
                  <ButtonRemove onClick={() => removeFavorite(obj.preview)}>
                    {loading === obj.preview ? (
                      <LoadingImage src={loadingGif} alt="loading" />
                    ) : (
                      <TrashIcon src={trashcanIcon} alt="trashcanIcon" />
                    )}
                  </ButtonRemove>
                </IconFlex>
              </SongContainer>
            ))
          ) : favoritesArray.length === 0 ? (
            <NoSongs>You have not added any songs to your favorites.</NoSongs>
          ) : (
            <h1>Loading...</h1>
          )}
        </FlexSong>
      </Container>
    </>
  );
};

const Container = styled.div`
  background-color: var(--background);
  height: 100%;
  @media (max-width: 1600px) {
    height: ${(props) => props.$height};
  }
`;

const FlexSong = styled.div`
  margin: 0 auto;
  width: 1500px;
  display: flex;
  flex-wrap: wrap;
`;

const SongContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 10px;
  width: 350px;
  height: 210px;
  border: 1px white solid;
  background-color: var(--seconds);
  border-radius: 3px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  audio::-webkit-media-controls-panel {
    background-color: var(--seconds);
  }
`;

const FlexSongName = styled.div`
  display: flex;
  justify-content: center;
  width: 250px;
  img {
    width: 80px;
    height: 80px;
    margin-right: 20px;
  }

  p {
    font-weight: bold;
    font-size: 14px;
  }
`;

const AudioPreview = styled.audio`
  width: 240px;
`;

const IconFlex = styled.div`
  display: flex;
  width: 250px;
  justify-content: space-between;
  margin-top: 5px;
  align-items: center;
`;

const ButtonRemove = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const SpotifyIcon = styled.img`
  width: 90px;
  object-fit: contain;
`;

const LoadingImage = styled.img`
  width: 40px;
`;

const TrashIcon = styled.img`
  width: 40px;
`;

const NoSongs = styled.h1`
  color: var(--seconds);
  margin: 0 auto;
  margin-top: 100px;
`;

export default Favorite;
