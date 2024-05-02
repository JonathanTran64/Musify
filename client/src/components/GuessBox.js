import { useEffect, useState } from "react";
import styled from "styled-components";

const GuessBox = ({ active, answer }) => {
  return (
    <Container $borderColor={active === "active" ? "green" : "black"}>
      <div>
        <p>{answer}</p>
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 5px;
  border: 1px ${(props) => props.$borderColor} solid;
  height: 35px;

  p {
    margin: 0;
  }
`;

export default GuessBox;
