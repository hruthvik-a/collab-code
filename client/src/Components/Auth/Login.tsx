import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { useSnackbar } from "notistack";
import axios from "axios";
import { login } from "../../APIs/API_EndPoints";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    axios
      .post(login, {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        Cookies.set("token", res.data.token, { expires: 24 });
        Cookies.set("username", username, { expires: 24 });
        enqueueSnackbar("Logged in Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        enqueueSnackbar("Error Occured", { variant: "error" });
      });
  };

  const handleNavigate = () => {
    navigate("/register");
  };
  return (
    <div>
      <div
        style={{
          padding: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          <form
            onSubmit={handleOnSubmit}
            style={{ display: "flex", flexDirection: "column", width: "30vw" }}
          >
            <h1 style={{ alignSelf: "center" }}>Collab Code - Login</h1>
            <InputLabel htmlFor={"username"} style={{ marginBottom: "0px" }}>
              <span className="fieldLabel">Username</span>
            </InputLabel>
            <TextField
              // required
              id="outlined-required"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
            <InputLabel htmlFor={"password"} style={{ marginBottom: "0px" }}>
              <span className="fieldLabel">Password</span>
            </InputLabel>
            <TextField
              // id="filled-password-input"
              // label="Password"
              type="password"
              autoComplete="current-password"
              // variant="filled"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <br />
            <Button variant="outlined" type="submit">
              Login
            </Button>
          </form>
          <span>
            Do not Have an Account ?
            <span
              style={{ color: "blue", fontWeight: "700", cursor: "pointer" }}
              onClick={handleNavigate}
            >
              {" "}
              Register Here
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
