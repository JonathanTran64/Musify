import { createContext, useEffect, useState } from "react";

export const SongContext = createContext();

const SongProvider = ({ children }) => {
  const [song, setSong] = useState("");

  // each try will have their answer match their index
  const [tries, setTries] = useState(["", "", "", "", "", ""]);

  useEffect(() => {
    setTries(["", "", "", "", "", ""]);
  }, [song]);

  return (
    <SongContext.Provider value={{ song, setSong, tries, setTries }}>
      {children}
    </SongContext.Provider>
  );
};

export default SongProvider;
