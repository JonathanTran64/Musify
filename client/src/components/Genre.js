import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SongContext } from "../context/SongContext";
const Genre = ({ genre, image }) => {
  const { setSong } = useContext(SongContext);
  const navigate = useNavigate();

  const handleClick = () => {
    setSong("");
    navigate(`/genre/${genre}`);
  };

  return (
    <Container>
      <button onClick={handleClick}>
        <img src={image} />
        <h2>{genre}</h2>
      </button>
    </Container>
  );
};

export default Genre;

const Container = styled.div`
  width: 300px;

  button {
    cursor: pointer;
    padding: 0;
    background-color: transparent;
    height: 190px;
    border: none;
  }

  h2 {
    position: relative;
    bottom: 110px;
    margin: 0 auto;
    text-align: center;
    color: white;
  }

  img {
    width: 300px;
    height: 190px;
    border: 1px var(--guessBox) solid;
    border-radius: 10px;
    object-fit: cover;
  }

  a {
    text-decoration: none;
  }
`;
