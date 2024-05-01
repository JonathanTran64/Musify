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
  width: 400px;
  h2 {
    position: absolute;
    left: 115px;
    top: 65px;
    width: 50px;
  }

  img {
    width: 300px;
    height: 200px;
    object-fit: cover;
  }

  a,
  a:visited {
    color: white;
  }
`;
