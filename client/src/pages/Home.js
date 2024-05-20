import styled from "styled-components";

import Genre from "../components/Genre";
import NavBar from "../components/NavBar";

import kpopImage from "../assets/kpop.jpg";
import popImage from "../assets/pop.png";
import hiphopImage from "../assets/hip-hop.png";
import countryImage from "../assets/country.png";
import rnbImage from "../assets/rnb.jpg";
import rockImage from "../assets/rock.png";
import arrowDownImage from "../assets/arrowDown.png";
import Footer from "../components/Footer";

const Home = () => {
  const genres = [
    { genre: "KPOP", image: kpopImage },
    { genre: "POP", image: popImage },
    { genre: "HIP-HOP", image: hiphopImage },
    { genre: "COUNTRY", image: countryImage },
    { genre: "R&B", image: rnbImage },
    { genre: "ROCK", image: rockImage },
  ];
  return (
    <Wrapper>
      <NavBar />
      <WelcomeWrapper>
        <h1>Welcome to MUSIFY!</h1>
        <h3>Pick a genre to start playing</h3>
        <img src={arrowDownImage} alt="arrowDown" />
      </WelcomeWrapper>
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
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--background);
  height: 100vh;
`;

const WelcomeWrapper = styled.div`
  padding: 30px 0 10px 0;
  text-align: center;
  color: var(--suggestText);
  h1 {
    margin: 0;
    font-size: 60px;
  }

  img {
    width: 20px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 1000px;
  height: 500px;
  flex-wrap: wrap;
`;

export default Home;
