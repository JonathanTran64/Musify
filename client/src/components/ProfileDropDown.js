import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import toast from "react-hot-toast";

const ProfileDropDown = () => {
  const { dropDownDisplay, user, setUser } = useContext(UserContext);

  const handleLogOut = () => {
    setUser(null);
    toast.success("Logout Successful");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Container>
      <Wrapper $display={dropDownDisplay ? "block" : "none"}>
        <p>Favorites</p>
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
  background-color: pink;
  border: 1px black solid;
  border-radius: 0px 0px 10px 10px;
  text-align: center;
  animation: dropdown 0.4s ease-out;

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
    margin-top: 15px;
  }

  @keyframes dropdown {
    from {
      height: 80px;
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
