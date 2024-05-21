import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  // user info
  const [user, setUser] = useState(null);
  // fullscreen background dark for how to play and login
  const [darkDisplay, setDarkDisplay] = useState(false);
  // display the login / register block
  const [displayRL, setDisplayRL] = useState(false);
  // click on profile on nav when not logged in
  const [firstClick, setFirstClick] = useState(false);
  // display drop down if user logged in
  const [dropDownDisplay, setDropDownDisplay] = useState(false);

  // gets profile of user based on given token
  useEffect(() => {
    axios.get("/profile").then(({ data }) => {
      setUser(data);
    });
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
        dropDownDisplay,
        setDropDownDisplay,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
