import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import xIconGrey from "../assets/xIconGrey.png";

const Login = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [displayLogIn, setDisplayLogIn] = useState(false);
  const { setDarkDisplay, displayRL, setDisplayRL } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", { email, password });
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Login Successful. Welcome to MUSIFY! ");
        setData({ ...data, password: "", email: "" });
        setDarkDisplay(false);
        setDisplayRL(false);
        navigate("/");
      }
    } catch (error) {}
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;

    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({ ...data, name: "", password: "", email: "" });
        toast.success("Register Successful. Please log in.");
        setDisplayLogIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper $display={displayRL ? "block" : "none"}>
      <Container>
        <XButton
          onClick={() => {
            setDarkDisplay(false), setDisplayRL(false);
          }}
        >
          <img src={xIconGrey} alt="xIconGrey" />
        </XButton>
        <ButtonsFlex>
          <RLButtons
            onClick={() => {
              setDisplayLogIn(false);
              setData({ ...data, name: "", password: "", email: "" });
            }}
          >
            Register
          </RLButtons>
          <RLButtons
            onClick={() => {
              setDisplayLogIn(true);
              setData({ ...data, name: "", password: "", email: "" });
            }}
          >
            Login
          </RLButtons>
        </ButtonsFlex>
        <MovingLineContainer>
          <MovingLine $left={displayLogIn ? "198px" : "3px"} />
        </MovingLineContainer>

        {/* FORMS */}
        <FormFlex>
          {/* REGISTER */}
          <DisplayForm $display={displayLogIn ? "none" : "block"}>
            <Form onSubmit={handleRegister}>
              <label>N A M E</label>
              <input
                type="text"
                placeholder="Name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
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
              <SubmitButton type="submit">Register</SubmitButton>
            </Form>
          </DisplayForm>

          <DisplayForm $display={displayLogIn ? "block" : "none"}>
            <Form
              onSubmit={handleLogin}
              $display={displayLogIn ? "block" : "none"}
            >
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
              <SubmitButton type="submit">Login</SubmitButton>
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
`;

const Container = styled.div`
  margin: 0 auto;
  width: 450px;
  height: 450px;
  background-color: var(--background);
  border: 1px var(--notSeconds) solid;
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
  animation: slide 1s ease-in-out;

  @keyframes slide {
    from {
      left: 3px;
    }

    to {
      left: 200px;
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
export default Login;
