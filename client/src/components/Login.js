import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import styled from "styled-components";
import axios from "axios";
// images
import xIconGrey from "../assets/xIconGrey.png";
import loadingGif from "../assets/loading.gif";
// context
import { UserContext } from "../context/UserContext";

const Login = () => {
  // user's input
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // display login or register
  const [displayLogIn, setDisplayLogIn] = useState(false);

  const [loading, setLoading] = useState(false);

  // context
  const {
    setDarkDisplay,
    displayRL,
    setDisplayRL,
    user,
    setUser,
    firstClick,
    setFirstClick,
  } = useContext(UserContext);

  // POST Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      setLoading(true);
      const { data } = await axios.post("/login", { email, password });
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success("Login Successful. Welcome to MUSIFY! ");
        setUser({ email: data.email, id: data._id, username: data.username });
        setData({ ...data, password: "", email: "" });
        setDarkDisplay(false);
        setDisplayRL(false);
        setLoading(false);
      }
    } catch (error) {}
  };

  // POST Register
  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = data;

    try {
      setLoading(true);
      const { data } = await axios.post("/register", {
        username,
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setData({ ...data, username: "", password: "", email: "" });
        toast.success("Register Successful. Please log in.");
        setDisplayLogIn(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Click Login ? Register : Login && animation bar
  const handleRegisterLoginHead = () => {
    if (firstClick) {
      setFirstClick(false);
    }
    if (displayLogIn) {
      setDisplayLogIn(false);
    } else {
      setDisplayLogIn(true);
    }

    setData({ ...data, username: "", password: "", email: "" });
  };

  return (
    <Wrapper
      $display={displayRL ? "block" : "none"}
      $slide={displayRL ? "slideRL" : "none"}>
      <Container>
        <XButton
          onClick={() => {
            setDarkDisplay(false), setDisplayRL(false);
          }}>
          <img src={xIconGrey} alt="xIconGrey" />
        </XButton>
        <ButtonsFlex>
          <RLButtons onClick={handleRegisterLoginHead}>Register</RLButtons>
          <RLButtons onClick={handleRegisterLoginHead}>Login</RLButtons>
        </ButtonsFlex>
        <MovingLineContainer>
          <MovingLine
            $slideLogin={
              firstClick
                ? "none"
                : displayLogIn
                ? "slideLogin"
                : "slideRegister"
            }
            $left={displayLogIn ? "198px" : "3px"}
          />
        </MovingLineContainer>

        {/* FORMS */}
        <FormFlex>
          {/* REGISTER */}
          <DisplayForm $display={displayLogIn ? "none" : "block"}>
            <Form onSubmit={handleRegister}>
              <label>U S E R N A M E</label>
              <input
                type="text"
                placeholder="UserName"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                required
              />
              <label>E M A I L</label>
              <input
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
              <label>P A S S W O R D</label>
              <input
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />
              {loading ? (
                <Loading src={loadingGif} alt="loadingGif" />
              ) : (
                <SubmitButton type="submit">Register</SubmitButton>
              )}
            </Form>
          </DisplayForm>

          <DisplayForm $display={displayLogIn ? "block" : "none"}>
            <Form
              onSubmit={handleLogin}
              $display={displayLogIn ? "block" : "none"}>
              <label htmlFor="email">E M A I L</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
              <label htmlFor="password">P A S S W O R D</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />

              {loading ? (
                <Loading src={loadingGif} alt="loadingGif" />
              ) : (
                <SubmitButton type="submit">Login</SubmitButton>
              )}
            </Form>
          </DisplayForm>
        </FormFlex>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: ${(props) => props.$display};
  position: absolute;
  width: 100%;
  height: 0px;
  top: 90px;
  background-color: var(--background);
  z-index: 999;
  animation: ${(props) => props.$slide} 0.3s ease-in-out;

  @keyframes slideRL {
    from {
      top: 120px;
    }
    to {
      top: 90px;
    }
  }
`;

const Container = styled.div`
  margin: 0 auto;
  width: 450px;
  height: 450px;
  background-color: var(--background);
  border: 1px var(--notSeconds) solid;
  border-radius: 15px;
`;

const XButton = styled.button`
  padding: 0px;
  background-color: transparent;
  border: none;
  position: relative;
  left: 400px;
  top: 15px;
  cursor: pointer;
  img {
    width: 30px;
    object-fit: contain;
  }
`;

const MovingLineContainer = styled.div`
  margin: 0 auto;
  width: 260px;
`;

const MovingLine = styled.div`
  position: relative;
  left: ${(props) => props.$left};
  border-radius: 5px;
  height: 3px;
  width: 70px;
  margin-bottom: 10px;
  background-color: var(--submit);
  animation: ${(props) => props.$slideLogin} 0.3s ease-in-out;

  @keyframes slideLogin {
    from {
      left: 3px;
    }

    to {
      left: 198px;
    }
  }

  @keyframes slideRegister {
    from {
      left: 198px;
    }

    to {
      left: 3px;
    }
  }
`;

const ButtonsFlex = styled.div`
  display: flex;
  width: 260px;
  margin: 0px auto 4px;

  justify-content: space-between;
`;

const RLButtons = styled.button`
  color: var(--seconds);
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const FormFlex = styled.div`
  width: 400px;
  margin: 0 auto;
`;

const DisplayForm = styled.div`
  display: ${(props) => props.$display};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  label {
    color: var(--seconds);
  }

  input {
    padding: 10px 0px 10px 5px;
    width: 250px;
    margin: 15px;
  }

  img {
    width: 50px;
  }
`;

const SubmitButton = styled.button`
  width: 100px;
  margin-top: 20px;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  background-color: var(--submit);
  color: var(--background);
  font-weight: bold;
  transition: opacity 0.1s;

  &:hover {
    opacity: 0.9;
  }
`;

const Loading = styled.img`
  margin-top: 20px;
`;
export default Login;
