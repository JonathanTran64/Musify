import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBar = ({ genre }) => {
  return (
    <Container>
      <FlexBox>
        <Link to={"/"}>
          {genre ? <h1>MUSIFY - {genre}</h1> : <h1>MUSIFY</h1>}
        </Link>
      </FlexBox>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: var(--background);
  border-bottom: 1px var(--seconds) solid;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 500px;
  height: 100%;

  a {
    text-decoration: none;
  }

  h1 {
    margin: 0;
    color: var(--seconds);
  }
`;
export default NavBar;
