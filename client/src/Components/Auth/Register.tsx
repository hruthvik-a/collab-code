import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { login, register } from "../../APIs/API_EndPoints";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

function Register() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("register");
    axios
      .post(register, {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log("register");
        enqueueSnackbar("Registered Successfully", { variant: "success" });
        navigate("/login");
      })
      .catch((err) => {
        enqueueSnackbar(err, {
          variant: "error",
        });
      });
  };
  const handleNavigate = () => {
    navigate("/login");
  };
  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        //    alignItems: "center",
      }}
    >
      <div>
        <form
          style={{ display: "flex", flexDirection: "column", width: "30vw" }}
          onSubmit={handleSubmit}
        >
          <div
            style={{
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1>COLLAB CODE - Register</h1>
            {/* <h3>New User Registration</h3> */}
          </div>

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
            Register
          </Button>
        </form>
        <span>
          Have Account ?
          <span
            style={{ color: "blue", fontWeight: "700", cursor: "pointer" }}
            onClick={handleNavigate}
          >
            {" "}
            Login Here
          </span>
        </span>
      </div>
    </div>
  );
}

export default Register;
