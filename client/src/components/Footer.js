import styled from "styled-components";
import githubIcon from "../assets/githubIcon.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <FlexWrapper>
          <p> &copy;2024 MUSIFY | Jonathan Tran </p>
          <Link to={"https://github.com/JonathanTran64"} target="blank">
            <img src={githubIcon} alt="gitHubIcon" />
          </Link>
        </FlexWrapper>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  top: 115px;
`;

const Container = styled.footer`
  width: 100%;
  padding: 20px;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;

  p {
    margin: 0;
    font-weight: bold;
    color: white;
  }

  img {
    width: 40px;
  }
`;
export default Footer;
