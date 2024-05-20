import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import goldIcon from "../assets/goldIcon.png";
import silverIcon from "../assets/silverIcon.png";
import bronzeIcon from "../assets/bronzeIcon.png";

const LeaderBoard = ({ genre }) => {
  const [top10, setTop10] = useState([]);

  useEffect(() => {
    const getTop10 = async () => {
      const response = await axios.get(`/top10streaks/${genre}`);
      const { top10UsersData } = await response.data;
      setTop10(top10UsersData);
      console.log(top10UsersData);
    };
    getTop10();
  }, []);

  return (
    <Container>
      <h2>LEADER BOARD - {genre}</h2>
      <FlexHeaders>
        <h3>RANK</h3>
        <h3>USERNAME</h3>
        <h3>SCORE</h3>
      </FlexHeaders>
      {top10.map((obj, i) => {
        return (
          <FlexUser
            key={obj.username}
            $color={
              i === 0
                ? "#ffc300"
                : i === 1
                ? "#e5e5e5"
                : i === 2
                ? "#ffba9e"
                : "lightgray"
            }
          >
            {i < 3 ? (
              <MedalImage
                src={
                  i === 0
                    ? goldIcon
                    : i === 1
                    ? silverIcon
                    : i === 2
                    ? bronzeIcon
                    : null
                }
                alt="goldIcon"
              />
            ) : (
              <RankNumber> {i + 1}</RankNumber>
            )}
            <p>{obj.username}</p>
            <p>{obj.bestStreak}</p>
          </FlexUser>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 90px;
  right: 70px;
  width: 400px;
  height: 320px;
  border: 1px gold solid;

  h2 {
    text-align: center;
    color: gold;
    margin-bottom: 0;
  }

  @media (max-width: 1600px) {
    right: 10px;
    width: 350px;
  }

  @media (max-width: 1400px) {
    width: 280px;
    height: 300px;
    right: 20px;

    h2 {
      font-size: 18px;
    }
  }

  @media (max-width: 1300px) {
    display: none;
  }
`;

const FlexHeaders = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;

  h3 {
    margin-bottom: 0;
    color: white;
  }

  @media (max-width: 1600px) {
    h3 {
      font-size: 15px;
    }
  }
`;

const FlexUser = styled.div`
  display: flex;
  width: 280px;
  justify-content: space-between;
  align-items: center;
  margin-left: 55px;

  p {
    margin-right: 10px;
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 500;
    color: ${(props) => props.$color};
  }

  @media (max-width: 1600px) {
    width: 260px;
    margin-left: 40px;
  }

  @media (max-width: 1400px) {
    width: 215px;
    margin-left: 30px;
  }
`;

const MedalImage = styled.img`
  width: 30px;
`;

const RankNumber = styled.p`
  margin-left: 10px;
`;

export default LeaderBoard;
