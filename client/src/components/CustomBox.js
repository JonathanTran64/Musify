// package
import styled from "styled-components";

// context
import { useContext } from "react";
import { SongContext } from "../context/SongContext";

const CustomBox = () => {
  const {
    customGenre,
    playlist,
    setPlaylist,
    setCustomPlaylist,
    customSubmit,
    setCustomSubmit,
  } = useContext(SongContext);

  //   Click Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setCustomPlaylist(true);
    setCustomSubmit(true);
  };

  return (
    <Wrapper $display={customGenre && !customSubmit ? "block" : "none"}>
      <Container>
        <h2>Welcome to Custom Songs!</h2>
        <p>
          Add up to a maximum of 3 playlists of your choice to start playing!
          (Deezer only){" "}
        </p>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="playlist">P L A Y L I S T S</label>
          <input
            id="playlist"
            type="text"
            placeholder="Ex: deezer.com/en/playlist/3110429622"
            value={playlist.playlist1}
            onChange={(e) =>
              setPlaylist({ ...playlist, playlist1: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Ex: deezer.com/en/playlist/3110429622"
            value={playlist.playlist2}
            onChange={(e) =>
              setPlaylist({ ...playlist, playlist2: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Ex: deezer.com/en/playlist/3110429622"
            value={playlist.playlist3}
            onChange={(e) =>
              setPlaylist({ ...playlist, playlist3: e.target.value })
            }
          />
          <button type="submit">S U B M I T</button>
        </Form>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: ${(props) => props.$display};
  width: 100%;
  height: 100vh;
  position: absolute;
`;

const Container = styled.div`
  position: relative;
  padding: 10px 20px;
  width: 730px;
  height: 450px;
  background: linear-gradient(
    to bottom,
    rgb(234, 56, 240),
    rgba(100, 100, 100, 1)
  );

  margin: 50px auto;
  text-align: center;
  border-radius: 3px;
  animation: customSlide 0.6s ease-out;

  @keyframes customSlide {
    from {
      bottom: 100px;
    }
    to {
      bottom: 0px;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  input {
    padding: 10px 0px 10px 10px;
    margin: 20px 0px;
    background-color: #f3f3f4;
    border: none;
  }

  button {
    border: none;
    border-radius: 3px;
    background-color: rgba(100, 190, 100, 1);
    cursor: pointer;
    color: var(--background);
    font-weight: bold;
    transition: opacity 0.1s;
    width: 160px;
    margin: 10px auto;
    padding: 15px;

    &:hover {
      opacity: 0.9;
    }
  }
`;

export default CustomBox;
