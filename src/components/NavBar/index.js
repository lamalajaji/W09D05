import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../Reducers/Login";
import { MdLogout } from "react-icons/md";


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
    <div className="header">
      <div className="logo">
        <h2> Comic</h2>
      </div>
      <div className="nav">
        <ul className="navLinks">
          <Link to="/explore">
            <li>Explore | </li>
          </Link>
          {/* <Link to="/explore">
            <li> My Profile |</li>
          </Link> */}
          <Link to="/explore">
            <li>
              <button className="logout" onClick={signout}>
                Logout <MdLogout />
              </button>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
