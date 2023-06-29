import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext.js";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const baseURL = "http://localhost:4000";

  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    if (register) {
      console.log(username);
      console.log(password);

      axios
        .post(`${baseURL}/register`, { username, password })
        .then((response) => {
          const { token, exp, userId } = response.data;
          authCtx.login(token, exp, userId);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(`${baseURL}/login`, { username, password })
        .then((response) => {
          const { token, exp, userId } = response.data;
          authCtx.login(token, exp, userId);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Username"
          className="form-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
