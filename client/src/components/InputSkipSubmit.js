import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// images
import searchIcon from "../assets/searchIcon.png";

const InputSkipSubmit = ({
  song,
  seconds,
  setSeconds,
  tries,
  setTries,
  count,
  genre,
  inputGuess,
  setInputGuess,
  setCount,
}) => {
  const navigate = useNavigate();

  // PRESS SKIP BUTTON
  const handleSkip = () => {
    if (count < 5) {
      const newTries = [...tries];
      newTries[count] = "S K I P P E D";
      setTries(newTries);
    }
    setCount((count += 1));
    setSeconds(seconds + count);
  };

  // PRESS SUBMIT BUTTON
  const handleSubmit = () => {
    // No Input
    if (!inputGuess.trim()) {
      return;
    }
    // Wrong guess and not all tries are used
    if (
      inputGuess.trim() !== `${song.artistName} - ${song.songName}` &&
      count < 5
    ) {
      const newTries = [...tries];
      newTries[count] = inputGuess.trim();
      setTries(newTries);
      setCount((count += 1));
      setSeconds(seconds + count);
      setInputGuess("");
    } else {
      navigate(`/song/${genre}/${song.songName}`);
    }
  };

  // PRESS "ENTER" KEY TO SUBMIT
  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    };
    document.addEventListener("keydown", handleEnter);

    return () => {
      document.removeEventListener("keydown", handleEnter);
    };
  }, [handleSubmit]);

  return (
    <div>
      {/* GUESS INPUT */}
      <InputSkipSubmitWrapper>
        <InputWrapper>
          <SearchIcon src={searchIcon} alt="searchIcon" />
          <InputGuess
            type="text"
            placeholder="Know the song?"
            value={inputGuess}
            onChange={(e) => {
              setInputGuess(e.target.value);
            }}
          />
        </InputWrapper>

        {/* SKIP BUTTON */}
        <WrapperSkipSubmit>
          {count !== 5 ? (
            <SkipButton onClick={handleSkip}>
              S K I P ( + {count + 1} s )
            </SkipButton>
          ) : (
            <Link to={`/song/${genre}/${song.songName}`}>
              <SkipButtonLink>S K I P</SkipButtonLink>
            </Link>
          )}
          {/* SUBMIT BUTTON */}
          <SubmitButton onClick={handleSubmit}>SUBMIT</SubmitButton>
        </WrapperSkipSubmit>
      </InputSkipSubmitWrapper>
    </div>
  );
};

const InputSkipSubmitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  margin: 0 auto;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const SearchIcon = styled.img`
  position: absolute;
  width: 22px;
  top: 12px;
  left: 10px;
`;
const InputGuess = styled.input`
  width: 655px;
  height: 40px;
  padding-left: 40px;
`;

const WrapperSkipSubmit = styled.div`
  margin-top: 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
`;

const SkipButton = styled.button`
  /* padding: 10px 10px; */
`;

const SkipButtonLink = styled.button`
  height: 100%;
  width: 100px;
`;

const SubmitButton = styled.button`
  width: 90px;
`;
export default InputSkipSubmit;
