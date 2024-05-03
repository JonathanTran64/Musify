import styled from "styled-components";

import Genre from "../components/Genre";

import kpopImage from "../assets/kpop.jpg";
import popImage from "../assets/pop.png";
import hiphopImage from "../assets/hip-hop.png";
import countryImage from "../assets/country.png";

const Home = () => {
  const genres = [
    { genre: "KPOP", image: kpopImage },
    { genre: "POP", image: popImage },
    { genre: "HIP-HOP", image: hiphopImage },
    { genre: "COUNTRY", image: countryImage },
  ];
  return (
    <Container>
      {genres.map((obj) => {
        return (
          <Genre
            key={obj.genre + "genre"}
            genre={obj.genre}
            image={obj.image}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 1000px;
  height: 500px;
  flex-wrap: wrap;
`;

export default Home;
