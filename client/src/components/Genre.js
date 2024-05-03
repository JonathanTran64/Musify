import { Link } from "react-router-dom";
import styled from "styled-components";

const Genre = ({ genre, image }) => {
  return (
    <Container>
      <Link to={`/genre/${genre}`}>
        <h2>{genre}</h2>
        <img src={image} />
      </Link>
    </Container>
  );
};

export default Genre;

const Container = styled.div`
  width: 300px;

  h2 {
    position: relative;
    top: 110px;
    margin: 0 auto;
    text-align: center;
    color: white;
  }

  img {
    width: 300px;
    height: 190px;
    border: 1px black solid;
    border-radius: 10px;
    object-fit: cover;
  }

  a {
    text-decoration: none;
  }
`;
