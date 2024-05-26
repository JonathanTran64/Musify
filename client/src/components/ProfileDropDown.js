import styled from "styled-components";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

//images
import logOutIcon from "../assets/logOutIcon.png";
import heartBlack from "../assets/heartBlack.png";

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
          }}>
          <p>Favorites</p>
          <img src={heartBlack} alt="heartBlack" />
        </button>
        <div></div>
        <button onClick={handleLogOut}>
          <p>Log Out</p>
          <img src={logOutIcon} alt="logOutIcon" />
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
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  border-bottom: 1px black solid;
  border-right: 1px black solid;
  border-left: 1px black solid;
  border-radius: 0px 0px 5px 5px;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    animation: Pdropdown 0.4s ease-out;
    border: none;
    background-color: transparent;
    cursor: pointer;
    width: 110px;
    margin-left: 55px;

    img {
      width: 25px;
    }
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
