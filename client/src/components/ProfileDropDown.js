import styled from "styled-components";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// context
import { UserContext } from "../context/UserContext";

const ProfileDropDown = () => {
  const { dropDownDisplay, setDropDownDisplay, setUser } =
    useContext(UserContext);

  const navigate = useNavigate();

  const handleLogOut = () => {
    setUser(null);
    setDropDownDisplay(false);
    toast.success("Logout Successful");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  return (
    <Container>
      <Wrapper $display={dropDownDisplay ? "block" : "none"}>
        <button
          onClick={() => {
            setDropDownDisplay(false);
            navigate("/favorites");
          }}
        >
          <p>Favorites</p>
        </button>
        <div></div>
        <button onClick={handleLogOut}>
          <p>Log Out</p>
        </button>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  width: 1065px;
  display: flex;
  justify-content: flex-end;
`;

const Wrapper = styled.div`
  display: ${(props) => props.$display};
  position: absolute;
  width: 200px;
  height: 105px;
  background-color: var(--seconds);
  border: 1px black solid;
  border-radius: 0px 0px 10px 10px;
  text-align: center;
  animation: dropdown 0.4s ease-out;
  z-index: 2;

  div {
    width: 100%;
    height: 1px;
    background-color: black;
    position: relative;
    animation: Pdropdown 0.4s ease-out;
  }

  button {
    position: relative;
    animation: Pdropdown 0.4s ease-out;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  @keyframes dropdown {
    from {
      height: 80px;
    }

    to {
      height: 105px;
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
