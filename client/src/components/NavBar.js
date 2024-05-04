import { Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

//images
import questionMarkIcon from "../assets/questionMark.png";
import profileIcon from "../assets/profileicon.png";
import noteIcon from "../assets/note.png";
import soundIcon from "../assets/sound.png";
import smileIcon from "../assets/smile.png";
import xIconGrey from "../assets/xIconGrey.png";

const NavBar = ({ genre }) => {
  const [display, setDisplay] = useState(false);
  const handleClickDark = () => {
    setDisplay(false);
  };

  return (
    <>
      <Dark
        id="yourDivId"
        onClick={handleClickDark}
        $display={display ? "block" : "none"}
      ></Dark>
      <Container>
        <FlexBox>
          <HowToPlayButton onClick={() => setDisplay(true)}>
            <img src={questionMarkIcon} alt="questionMark" />
          </HowToPlayButton>
          <Link to={"/"}>
            {genre ? <h1>MUSIFY - {genre}</h1> : <h1>MUSIFY</h1>}
          </Link>
          <img src={profileIcon} alt="profileIcon" />
        </FlexBox>
      </Container>

      <HowToPlayWrapper>
        <HowToPlay $display={display ? "block" : "none"}>
          <HowToPlayFlex>
            <HeaderXFlex>
              <Header>
                <p>H O W</p>
                <p>T O</p>
                <p>P L A Y</p>
              </Header>
              <button
                onClick={() => {
                  setDisplay(false);
                }}
              >
                <img src={xIconGrey} alt="xIconGrey"></img>
              </button>
            </HeaderXFlex>

            <Rules>
              <img src={noteIcon} alt="noteIcon"></img>
              <p>
                Listen to the track, then find the correct song in the list.
              </p>
            </Rules>

            <Rules>
              <img src={soundIcon} alt="soundIcon"></img>
              <p>Skipped or incorrect attempts unlock more of the track.</p>
            </Rules>

            <Rules>
              <img src={smileIcon} alt="smileIcon"></img>
              <p>Answer in as few tries as possible and share your score!.</p>
            </Rules>
            <CloseButton
              onClick={() => {
                setDisplay(false);
              }}
            >
              P L A Y
            </CloseButton>
          </HowToPlayFlex>
        </HowToPlay>
      </HowToPlayWrapper>
    </>
  );
};

const Dark = styled.div`
  display: ${(props) => props.$display};
  position: absolute;
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
  background-color: black;
  z-index: 99;
`;

const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: var(--background);
  border-bottom: 1px var(--seconds) solid;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 900px;
  height: 100%;

  a {
    text-decoration: none;
  }

  h1 {
    margin: 0;
    color: var(--seconds);
  }

  img {
    width: 35px;
  }
`;

const HowToPlayButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const HowToPlayWrapper = styled.div`
  width: 450px;
  margin: 0 auto;
`;

const HowToPlay = styled.div`
  display: ${(props) => props.$display};
  background-color: var(--background);
  position: absolute;
  width: 450px;
  border: 1px var(--notSeconds) solid;
  height: 340px;
  z-index: 999;
  top: 110px;
`;
const HowToPlayFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  width: 150px;
  margin-right: 95px;
  justify-content: space-between;
  color: var(--notSeconds);

  p {
    font-weight: bold;
  }
`;

const HeaderXFlex = styled.div`
  width: 400px;
  display: flex;
  justify-content: flex-end;
  img {
    width: 30px;
    object-fit: contain;
  }

  button {
    padding: 0;
    margin-top: 3px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

const Rules = styled.div`
  display: flex;
  width: 100%;

  img {
    object-fit: contain;
    width: 40px;
    margin: 0 10px 5px 10px;
  }

  p {
    color: var(--seconds);
    width: 370px;
  }
`;

const CloseButton = styled.button`
  margin-top: 10px;
  border: none;
  padding: 10px 20px;
  border-radius: 3px;
  background-color: var(--submit);
  cursor: pointer;
  color: var(--background);
  font-weight: bold;
  transition: opacity 0.1s;

  &:hover {
    opacity: 0.9;
  }
`;
export default NavBar;
