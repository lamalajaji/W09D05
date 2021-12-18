import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../Reducers/Login";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


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
          identity: identity,
          password: password,
        }
      );
      dispatch(
        signIn({
          role: result.data.result.role,
          token: result.data.token,
          user: result.data.result
        })
      );
      navigate("/explore");
    } catch (error) {
      console.log(error);
    }
  
      
    }

    const responseSuccessGoogle = (response)=>{
console.log(response);
axios({
  method: "POST",
  url: `${process.env.REACT_APP_BASE_URL}/googlelogin`,
  data: { tokenId: response.tokenId },
}).then(response => {
  console.log("Google login Success: ",response);

})
// navigate("/explore");
    }
       
const responseErrorGoogle = (response)=>{
  console.log(response);
}

const resetPass = async ()=> {
  const { value: email } = await Swal.fire({
    title: "Forgot Password",
    input: "email",
    inputPlaceholder: "Enter your email address",
    showCancelButton: true,
    confirmButtonColor: "#E07A5F",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  });
   if (email) {
     try{
       await axios.post(`${process.env.REACT_APP_BASE_URL}/check`,{
         email
       });
       Swal.fire({
         icon: "success",
         text: "Confirm your Email to Reset passwrd",
         confirmButtonColor: "#E07A5F",
       });

     } catch(error) {
       Swal.fire({
         icon: "error",
         text: "Somthing went Wrong!",
         confirmButtonColor : "#E07A5F"
       })
     }
   }
}
  

  return (
    <div className="loginWrapper">
      {!state.token ? (
        <div className="loginInner">
          <div className="form">
            <h1 className="login">Login</h1>
            {message ? <div className="message">{message} </div> : ""}
            <input
              type="email"
              name="email"
              placeholder="Email or Username"
              required
              className="email"
              onChange={(e) => setIdentity(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="submit"
              value="login"
              className="loginBtn"
              onClick={login}
            />

            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
              buttonText="Login With Google"
              onSuccess={responseSuccessGoogle}
              onFailure={responseErrorGoogle}
              cookiePolicy={"single_host_origin"}
              className="google"
            />
            <p className="h3" onClick={resetPass}> Forgot Your Password ? </p>
            <h3 className="signUp">
              Not a member ? <Link to="/signup">Sign up now </Link>
            </h3>
          </div>
        </div>
      ) : (
        <h1 className="">
          You Already Logged in , Go To <Link to="/explore">Home </Link>
        </h1>
      )}
    </div>
  );
};

export default Login;
