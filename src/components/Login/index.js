import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../Reducers/Login";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [passowrd, setPassword] = useState("");

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
    };
  });

  // console.log(process.env.REACT_APP_BASE_URL);

  const login = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        {
          email,
          passowrd,
        }
      );
      dispatch(
        signIn({ role: result.data.result.role, token: result.data.token })
      );

      navigate("/list");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper">
      {!state.token ? (
        <div className="form">
          <h1>Login</h1>

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="login" onClick={login} />

          <h3>
            {" "}
            You Don't Have an Account ? <Link to="/signup">
              SignUp Here{" "}
            </Link>{" "}
          </h3>
        </div>
      ) : (
        <h1>
          {" "}
          You Already Logged in , Go To <Link to="/list">Your List </Link>{" "}
        </h1>
      )}
    </div>
  );
};

export default Login;
