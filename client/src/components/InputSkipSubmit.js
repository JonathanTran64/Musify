import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// images
import searchIconWhiteImage from "../assets/searchiconwhite.png";

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
    if (count <= 5) {
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
      const newTries = [...tries];
      newTries[count] = inputGuess.trim();
      setTries(newTries);
      navigate(`/answer/${genre}`);
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
          <SearchIcon src={searchIconWhiteImage} alt="searchIcon" />
          <InputGuess
            type="text"
            placeholder="Know the song? Search for the title!"
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
            <Link to={`/answer/${genre}`}>
              <SkipButtonLink onClick={handleSkip}>S K I P</SkipButtonLink>
            </Link>
          )}
          {/* SUBMIT BUTTON */}
          <SubmitButton onClick={handleSubmit}>S U B M I T</SubmitButton>
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
  top: 18px;
  left: 10px;
`;
const InputGuess = styled.input`
  width: 655px;
  height: 40px;
  padding: 7px 0px 7px 40px;
  background-color: #212529;
  border: 1px #6c757d solid;
  color: #f8f9fa;

  &::placeholder {
    color: #adb5bd;
  }
`;

const WrapperSkipSubmit = styled.div`
  margin-top: 20px;
  height: 40px;
  display: flex;
  justify-content: space-between;
`;

const SkipButton = styled.button`
  border: none;
  border-radius: 3px;
  background-color: #adb5bd;
  cursor: pointer;
  color: #212529;
  font-weight: bold;
  transition: opacity 0.1s;

  &:hover {
    opacity: 0.9;
  }
`;

const SkipButtonLink = styled(SkipButton)`
  height: 100%;
  width: 100px;
`;

const SubmitButton = styled(SkipButton)`
  width: 100px;
  background-color: #adc178;
`;
export default InputSkipSubmit;
