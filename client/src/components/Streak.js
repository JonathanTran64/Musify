import styled from "styled-components";
import crownIcon from "../assets/crownIcon.png";
import fireIcon from "../assets/fireIcon.png";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Streak = () => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const getStreaks = async () => {
      if (user) {
        const response = await axios.get(`/streaks/${user.id}`);
        const { currentStreak, bestStreak } = await response.data;
        setCurrentStreak(currentStreak);
        setBestStreak(bestStreak);
      }
    };
    getStreaks();
  }, [user]);

  return (
    <Container>
      <FlexHeader>
        <Icon src={fireIcon} alt="fireIcon" $top="21px" $left="30px" />
        <Header>Current Streak</Header>
      </FlexHeader>
      <Number>{user ? currentStreak : "login"}</Number>
      <FlexHeader>
        <Icon src={crownIcon} alt="crownIcon" $top="146px" $left="40px" />
        <Header>Best Streak</Header>
      </FlexHeader>
      <Number>{user ? bestStreak : "login"}</Number>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  left: 50px;
  width: 300px;
  height: 300px;
  border: 1px white solid;
`;

const FlexHeader = styled.div`
  display: flex;
`;

const Header = styled.h2`
  margin: 25px auto;
  color: white;
  text-align: center;
`;

const Icon = styled.img`
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  width: 30px;
  object-fit: contain;
`;

const Number = styled.h2`
  color: white;
  margin: 0;
  text-align: center;
  font-size: 40px;
  text-decoration: 1px white solid;
`;
export default Streak;
