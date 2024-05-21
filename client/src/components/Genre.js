import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// context
import { SongContext } from "../context/SongContext";

const Genre = ({ genre, image }) => {
  const {
    setSong,
    setCustomGenre,
    setPlaylist,
    setCustomPlaylist,
    setCustomSubmit,
  } = useContext(SongContext);

  const navigate = useNavigate();

  const handleClick = () => {
    setSong("");
    navigate(`/genre/${genre}`);
    if (genre === "CUSTOM") {
      setCustomGenre(true);
      setPlaylist({
        playlist1: "",
        playlist2: "",
        playlist3: "",
      });
      setCustomPlaylist(false);
      setCustomSubmit(false);
    } else {
      setCustomGenre(false);
    }
  };

  return (
    <Container onClick={handleClick} $image={image}>
      <h2>{genre}</h2>
    </Container>
  );
};

export default Genre;

const Container = styled.button`
  margin: 0 10px;
  width: 240px;
  height: 600px;
  cursor: pointer;
  border: 1px var(--guessBox) solid;
  border-radius: 10px;
  background-image: url(${(props) => props.$image});
  background-size: cover;
  transition: width 0.2s linear, box-shadow 0.2s linear, border 0.1s linear;

  box-shadow: rgba(240, 46, 170, 0.4) 0px 5px, rgba(240, 46, 170, 0.3) 0px 10px,
    rgba(240, 46, 170, 0.2) 0px 15px, rgba(240, 46, 170, 0.1) 0px 20px,
    rgba(240, 46, 170, 0.05) 0px 25px;

  &:hover {
    width: 400px;
    box-shadow: rgba(255, 215, 0, 0.4) 0px 5px, rgba(255, 215, 0, 0.3) 0px 10px,
      rgba(255, 215, 0, 0.2) 0px 15px, rgba(255, 215, 0, 0.1) 0px 20px,
      rgba(255, 215, 0, 0.05) 0px 25px;
    border: 1px gold solid;

    h2 {
      color: gold;
    }

    @media (max-width: 1600px) {
      width: 350px;
    }
  }

  h2 {
    position: relative;
    bottom: 10px;
    margin: 0 auto;
    text-align: center;
    color: white;
  }

  a {
    text-decoration: none;
  }

  @media (max-width: 1600px) {
    width: 180px;
    height: 500px;
  }
`;
