import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../Reducers/Login";
import "./style.css";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      role: state.Login.role,
      user: state.Login.user,
    };
  });
  const signout = async () => {
    dispatch(signOut({ role: "", token: null, user: null }));
    navigate("/");
  };
  return (
    <header>
      <ul className="navLinks">
        <Link to="/explore">
          <li>Explore </li>
        </Link>
        <Link to="/explore">
          <li> My Profile </li>
        </Link>
        <Link to="/explore">
          <li>
            {" "}
            <button onClick={signout}> Log out </button>
          </li>
        </Link>
      </ul>
    </header>
  );
};

export default Nav;
