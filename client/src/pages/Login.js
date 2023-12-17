import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import bear from "../img/bear.png"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let history = useHistory();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        history.push("/");
      }
    });
  };
  return (
    <div className="loginContainer">
      <div className="loginContainerSmall">
        <div className="welcomeMessage">
          <img className="bearLogo" src={bear}></img>
          <h1 className="welcomeh1">Welcome back to BearSpace!</h1>
          <p className="loginText">Enter your login credentials</p>
        </div>

        <br></br><br></br>

        <label className="loginBoxText">Username:</label>
        <input
          id="inputLoginRegistration"
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />

        <br></br>

        <label className="loginBoxText">Password:</label>
        <input
          id="inputLoginRegistration"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        
        <br></br><br></br>
        
        <button onClick={login}> Login </button>
      </div>
    </div>
  );
}

export default Login;
