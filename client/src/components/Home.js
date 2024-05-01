import styled from "styled-components";

import Genre from "./Genre";

import kpopImage from "../assets/kpop.jpg";

const Home = () => {
  const genres = [{ genre: "KPOP", image: kpopImage }, {}];
  return (
    <Container>
      {genres.map((obj) => {
        return <Genre genre={obj.genre} image={obj.image} />;
      })}
    </Container>
  );
};

const Container = styled.div``;

export default Home;
