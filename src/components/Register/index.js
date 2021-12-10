import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [passowrd, setPassword] = useState("");

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
    };
  });

  const signUp = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/register`, {
        email,
        userName: username,
        passowrd,
        avatar,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(process.env.REACT_APP_BASE_URL);
  return (
    <div className="wrapper">
      {!state.token ? (
        <div className="form">
          <h1>Sign Up </h1>

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="url"
            name="avatar"
            placeholder="Avatar"
            onChange={(e) => setAvatar(e.target.value)}
          />

          <input type="submit" value="Sign Up" onClick={signUp} />

          <h3>
            {" "}
            You Have an Account ? <Link to="/">Login Here </Link>{" "}
          </h3>
        </div>
      ) : (
        <h1>
          {" "}
          You Already Logged in , Go To <Link to="/home">Home</Link>{" "}
        </h1>
      )}
    </div>
  );
};

export default SignUp;
