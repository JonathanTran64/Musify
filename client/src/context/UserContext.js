import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [darkDisplay, setDarkDisplay] = useState(false);
  const [displayRL, setDisplayRL] = useState(false);
  const [firstClick, setFirstClick] = useState(false);

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
      });
    }
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        darkDisplay,
        setDarkDisplay,
        displayRL,
        setDisplayRL,
        firstClick,
        setFirstClick,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
