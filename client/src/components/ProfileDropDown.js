import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ProfileDropDown = () => {
  const { dropDownDisplay, setDropDownDisplay, user, setUser } =
    useContext(UserContext);

  const handleLogOut = () => {
    setUser(null);
    setDropDownDisplay(false);
    toast.success("Logout Successful");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <Container>
      <Wrapper $display={dropDownDisplay ? "block" : "none"}>
        <Link to={"/favorites"}>
          <p>Favorites</p>
        </Link>
        <div></div>
        <p>Settings</p>
        <div></div>
        <button onClick={handleLogOut}>Log Out</button>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  width: 1115px;
  display: flex;
  justify-content: flex-end;
`;

const Wrapper = styled.div`
  display: ${(props) => props.$display};
  position: absolute;
  width: 250px;
  height: 160px;
  background-color: lightgray;
  border: 1px black solid;
  border-radius: 0px 0px 10px 10px;
  text-align: center;
  animation: dropdown 0.4s ease-out;
  z-index: 2;

  a {
    text-decoration: none;
    color: black;
  }

  p {
    position: relative;
    animation: Pdropdown 0.4s ease-out;
  }

  div {
    width: 100%;
    height: 1px;
    background-color: black;
    position: relative;
    animation: Pdropdown 0.4s ease-out;
  }

  button {
    position: relative;
    margin-top: 15px;
    animation: Pdropdown 0.4s ease-out;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  @keyframes dropdown {
    from {
      height: 120px;
    }

    to {
      height: 160px;
    }
  }

  @keyframes Pdropdown {
    from {
      top: -15px;
    }

    to {
      top: 0px;
    }
  }
`;

export default ProfileDropDown;
