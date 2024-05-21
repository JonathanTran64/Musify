import { createContext, useEffect, useState } from "react";

export const SongContext = createContext();

const SongProvider = ({ children }) => {
  const [song, setSong] = useState("");

  // each try will have their answer match their index
  const [tries, setTries] = useState(["", "", "", "", "", ""]);
  const [customGenre, setCustomGenre] = useState(false);

  const [customSubmit, setCustomSubmit] = useState(false);

  const [customPlaylist, setCustomPlaylist] = useState(false);

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
