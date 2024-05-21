import { createContext, useEffect, useState } from "react";

export const SongContext = createContext();

const SongProvider = ({ children }) => {
  // random song chosen
  const [song, setSong] = useState("");

  // each try will have their answer match their index
  const [tries, setTries] = useState(["", "", "", "", "", ""]);

  // flag to see if user playing custom
  const [customGenre, setCustomGenre] = useState(false);
  // custom submit button clicked
  const [customSubmit, setCustomSubmit] = useState(false);
  // flag for song game to use POST custom
  const [customPlaylist, setCustomPlaylist] = useState(false);

  // user's customs playlists
  const [playlist, setPlaylist] = useState({
    playlist1: "",
    playlist2: "",
    playlist3: "",
  });

  useEffect(() => {
    setTries(["", "", "", "", "", ""]);
  }, [song]);

  return (
    <SongContext.Provider
      value={{
        song,
        setSong,
        tries,
        setTries,
        customGenre,
        setCustomGenre,
        playlist,
        setPlaylist,
        customPlaylist,
        setCustomPlaylist,
        customSubmit,
        setCustomSubmit,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export default SongProvider;
