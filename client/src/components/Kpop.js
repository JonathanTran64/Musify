import { useEffect, useState } from "react";
import styled from "styled-components";

const Kpop = () => {
  const [song, setSong] = useState();

  useEffect(() => {
    const getKpop = async () => {
      try {
        const response = await fetch("/kpop");
        const data = await response.json();
        console.log(data.song);
        setSong(data.song);
      } catch (error) {
        console.log(error);
      }
    };

    getKpop();
  }, []);

  return (
    <D>
      {song ? (
        <audio controls>
          <source src={song.preview} type="audio/mpeg" />
        </audio>
      ) : (
        <h1>load...</h1>
      )}
    </D>
  );
};

const D = styled.div`
  width: 600px;
  height: 500px;
`;

export default Kpop;
