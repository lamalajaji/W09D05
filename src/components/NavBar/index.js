import React  from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const Nav = () => {
    return (
      <ul>
        <Link to="/explore">
          {" "}
          <li> Home </li>
        </Link>
        <Link to="/explore">
          {" "}
          <li> Home </li>
        </Link>
        <Link to="/explore">
          {" "}
          <li> Home </li>
        </Link>
      </ul>
    );
}

export default Nav;
