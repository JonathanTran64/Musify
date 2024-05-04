import styled from "styled-components";
import xIcon from "../assets/xIcon.png";

const GuessBox = ({ active, answer }) => {
  return (
    <Container
      $color={answer !== "S K I P P E D" ? "#e9ecef" : "#6c757d"}
      $borderColor={
        active === "active"
          ? "#f8f9fa"
          : answer !== "S K I P P E D" && answer
          ? "red"
          : "#6c757d"
      }
    >
      <FlexBox>
        {answer === "S K I P P E D" ? (
          <EmptyBox></EmptyBox>
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
  border: 1px ${(props) => props.$borderColor} solid;
  height: 35px;
  background-color: #343a40;

  p {
    margin: 0;
    color: ${(props) => props.$color};
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

const EmptyBox = styled.div`
  width: 20px;
  height: 20px;
  margin: 0 10px 0 3px;
  border-radius: 4px;
  border: 2px #6c757d solid;
`;

export default GuessBox;
