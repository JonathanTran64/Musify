import styled from "styled-components";

// images
import playButtonWhiteImage from "../assets/playbuttonwhite.png";
import stopButtonWhiteImage from "../assets/stopbuttonwhite.png";

const PlayButton = ({ isPlaying, setIsPlaying, seconds, audioRef }) => {
  // PRESS PLAY BUTTON OR STOP
  const handlePlay = () => {
    audioRef.current.currentTime = 0;
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <SecondsPLayButtonWrapper>
      <p>0:00</p>
      {/* PLAY BUTTON */}
      <PlayButtonWrapper>
        <PlayButtonClick onClick={handlePlay}>
          <PlayButtonImage
            src={isPlaying ? stopButtonWhiteImage : playButtonWhiteImage}
            alt="playButton"
            $left={isPlaying ? "0px" : "3px"}
          />
        </PlayButtonClick>
      </PlayButtonWrapper>
      <p>{seconds}</p>
    </SecondsPLayButtonWrapper>
  );
};

const SecondsPLayButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 700px;
  margin: 10px auto;

  p {
    color: white;
  }
`;

const PlayButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const PlayButtonClick = styled.button`
  background-color: transparent;
  padding: 15px 17px;
  border-radius: 50px;
  border: 2px white solid;
  cursor: pointer;
`;

const PlayButtonImage = styled.img`
  position: relative;
  left: ${(props) => props.$left};
  top: 1px;
`;

export default PlayButton;
