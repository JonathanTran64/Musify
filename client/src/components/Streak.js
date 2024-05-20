import styled from "styled-components";
import crownIcon from "../assets/crownIcon.png";
import fireIcon from "../assets/fireIcon.png";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Streak = ({ genre }) => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const getStreaks = async () => {
      if (user) {
        try {
          const response = await axios.get(`/streaks/${genre}/${user.id}`);
          const { currentStreak, bestStreak } = response.data;
          setCurrentStreak(currentStreak);
          setBestStreak(bestStreak);
        } catch (error) {
          console.error("Error fetching streaks:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    getStreaks();
  }, [user]);
  return (
    <Container $display={user ? "block" : "none"}>
      <FlexHeader>
        <IconFire src={fireIcon} alt="fireIcon" />
        <Header>Current Streak</Header>
      </FlexHeader>
      <Number>{loading ? "..." : user ? currentStreak : null}</Number>
      <FlexHeader>
        <IconCrown src={crownIcon} alt="crownIcon" />
        <Header>Best Streak</Header>
      </FlexHeader>
      <Number> {loading ? "..." : user ? bestStreak : null}</Number>
    </Container>
  );
};

const Container = styled.div`
  display: ${(props) => props.$display};
  position: absolute;
  left: 150px;
  width: 300px;
  height: 300px;
  border: 1px white solid;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;

  @media (max-width: 1600px) {
    left: 50px;
  }

  @media (max-width: 1400px) {
    left: 50px;
    width: 250px;
    height: 250px;
  }

  @media (max-width: 1300px) {
    display: none;
  }
`;

const FlexHeader = styled.div`
  display: flex;
`;

const Header = styled.h2`
  margin: 25px auto;
  color: white;
  text-align: center;

  @media (max-width: 1400px) {
    font-size: 20px;
  }
`;

const IconFire = styled.img`
  position: absolute;
  top: 21px;
  left: 30px;
  width: 30px;
  object-fit: contain;

  @media (max-width: 1400px) {
    left: 20px;
    top: 18px;
  }
`;

const IconCrown = styled.img`
  position: absolute;
  top: 146px;
  left: 40px;
  width: 30px;
  object-fit: contain;

  @media (max-width: 1400px) {
    left: 30px;
    top: 133px;
  }
`;

const Number = styled.h2`
  color: white;
  margin: 0;
  text-align: center;
  font-size: 40px;

  @media (max-width: 1400px) {
    font-size: 35px;
  }
`;

export default Streak;
