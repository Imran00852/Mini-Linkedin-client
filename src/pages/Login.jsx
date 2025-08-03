import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { server } from "../constants/config";
import { userExists, userNotExists } from "../redux/reducers/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const toggleLogin = () => {
    setIsLogin((prev) => !prev);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(userExists(data?.user));
      toast.success(data?.msg || "Login successfull");
      navigate("/");
    } catch (err) {
      dispatch(userNotExists());
      toast.error(err.response?.data?.msg || "Login failed");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/user/register`,
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(userExists(data?.user));
      toast.success(data?.msg || "User Registered successfully");
      navigate("/");
    } catch (err) {
      dispatch(userNotExists());
      toast.error(err.response?.data?.msg || "Failed to register user");
    }
  };

  return (
    <>
      <Container
        maxWidth="xs"
        style={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Paper elevation={3} style={{ padding: "20px" }}>
          {isLogin ? (
            <Typography
              variant="h5"
              textAlign={"center"}
              textTransform={"uppercase"}
            >
              Login
            </Typography>
          ) : (
            <Typography
              variant="h5"
              textAlign={"center"}
              textTransform={"uppercase"}
            >
              Sign Up
            </Typography>
          )}
          {isLogin ? (
            <>
              <form onSubmit={handleLogin}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: "1rem" }}
                  fullWidth
                >
                  Login
                </Button>
                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>
                <Button variant="text" fullWidth onClick={toggleLogin}>
                  Sign Up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <form onSubmit={handleSignUp}>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  type="email"
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: "1rem" }}
                  fullWidth
                >
                  Sign Up
                </Button>
                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>
                <Button variant="text" fullWidth onClick={toggleLogin}>
                  Login Instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default Login;
