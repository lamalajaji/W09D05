import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import ReactCodeInput from "react-verification-code-input";
import "./style.css";

const Verification = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  //   const state = useSelector((state) => {
  //     return {
  //       token: state.Login.token,
  //     };
  //   });

  const verify = async () => {
    if (code) {
      try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/verify`, {
          id,
          code,
        });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="verify"> 
        <h1 className="login"> Verify Your Account : </h1>
        <ReactCodeInput className="digit" fields={4} onComplete={(digit) => setCode(digit)} />
        <button className="confirmBtn" onClick={verify}>Confirm </button>
      </div>
    </>
  );
};

export default Verification;
