import React, { useState , useEffect } from "react";
import PasswordChecklist from "react-password-checklist";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import "./style.css";
const SignUp = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
    };
  });
  useEffect(()=> {
     getAllUSers() 
  },[])

  const getAllUSers =async ()=> 
  {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`);
      setUsers(res.data)

  }

  const signUp = async () => {
    let exist = false;
    users.filter((user) => {
      if (user.email === email || user.userName === username) {
        exist = true;
      }
    });
    if (exist) {
      Swal.fire({
        title: "Email or Username Already Exist, try with another ones ",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/register`, {
          email,
          userName: username,
          password,
          role: process.env.REACT_APP_ROLE,
        });
        navigate("/verify");
      } catch (error) {
        console.log(error);
      }
    }
  }
//   console.log(process.env.REACT_APP_BASE_URL);
//   console.log(process.env.REACT_APP_ROLE);
  return (
    <div className="wrapper">
      {!state.token ? (
        <div className="form">
          <PasswordChecklist
            rules={[
              "minLength",
              "specialChar",
              "number",
              "capital",
              "lowercase",
            ]}
            minLength={8}
            value={password}
            onChange={(isValid) => {
              if (isValid) {
                const button = document.querySelector("#signupSubmitButton");
                button.disabled = false;
              } else {
                const button = document.querySelector("#signupSubmitButton");
                button.disabled = true;
              }
            }}
          />
          <h1>Sign Up </h1>
          <form
            className="signupForm"
            onSubmit={(e) => {
              e.preventDefault();
              signUp(e);
            }}
          >
            <input
              type="text"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              id="signupSubmitButton"
              type="submit"
              value="Submit"
              disabled
            />
          </form>
          <h3>
            {" "}
            You Have an Account ? <Link to="/">Login Here </Link>{" "}
          </h3>
        </div>
      ) : (
        <h1>
          {" "}
          You Already Logged in , Go To <Link to="/explore">Home</Link>{" "}
        </h1>
      )}
    </div>
  );
};

export default SignUp;
