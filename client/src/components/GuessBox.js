import styled from "styled-components";
import xIcon from "../assets/xIcon.png";
import skipIcon from "../assets/skipIcon.png";

const GuessBox = ({ active, answer }) => {
  return (
    <Container
      $borderColor={active === "active" ? "green" : "black"}
      $border={active === "active" ? "2px" : "1px"}
    >
      <FlexBox>
        {answer === "S K I P P E D" ? (
          <img src={skipIcon} alt="skipIcon" />
        ) : answer ? (
          <img src={xIcon} alt="xIcon" />
        ) : null}
        <p>{answer}</p>
      </FlexBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin-bottom: 7px;
  border: ${(props) => props.$border} ${(props) => props.$borderColor} solid;
  height: 35px;
  background-color: #d6d6d6;

  p {
    margin: 0;
  }
`;

const FlexBox = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;

  img {
    width: 30px;
    margin-right: 10px;
  }
`;

export default GuessBox;
