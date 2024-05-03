import styled from "styled-components";

const SongProgressBar = ({ isPlaying, count }) => {
  return (
    <>
      {/* AUDIO BAR */}
      <ProgressBarWrapper>
        <ProgressBar>
          {/* Line Seconds Limit */}
          <LineWrapper>
            <Line $width={"50px"}></Line>
            <Line $width={"95px"}></Line>
            <Line $width={"185px"}></Line>
            <Line $width={"315px"}></Line>
            <Line $width={"487px"}></Line>
          </LineWrapper>
          {/* RED BAR ANIMATION */}
          <Player $isPlaying={isPlaying}></Player>
          {/* Grey background when skipped */}
          <SkipWrapper>
            <Skipped
              $width={
                count === 0
                  ? "50px"
                  : count === 1
                  ? "95px"
                  : count === 2
                  ? "185px"
                  : count === 3
                  ? "315px"
                  : count === 4
                  ? "487px"
                  : count === 5
                  ? "700px"
                  : ""
              }
            ></Skipped>
          </SkipWrapper>
        </ProgressBar>
      </ProgressBarWrapper>
    </>
  );
};

const SkipWrapper = styled.div`
  position: relative;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  z-index: 0;
`;

const Skipped = styled.div`
  position: absolute;
  width: ${(props) => props.$width};
  height: 15px;
  background-color: #202020;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid black;
  width: 100%;
  height: 15px;
`;

const ProgressBar = styled.div`
  border-right: 1px solid black;
  height: 15px;
  width: 700px;
  margin-bottom: 10px;
`;

const Player = styled.div`
  position: relative;
  bottom: 15px;
  background-color: #ffee32;
  width: 5px;
  height: 100%;
  animation: ${({ $isPlaying }) => ($isPlaying ? "slide" : "none")} 16s linear;
  z-index: 1;
  @keyframes slide {
    from {
      width: 5px;
    }
    to {
      width: 100%;
    }
  }
`;

const LineWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Line = styled.div`
  position: absolute;
  height: 100%;
  width: ${(props) => props.$width};
  border-right: 1px black solid;
  z-index: 2;
`;

export default SongProgressBar;
