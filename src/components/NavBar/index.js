import React  from "react";
import { Link } from "react-router-dom";
import "./style.css";


const Nav = () => {
    return (
      <header>
        <ul className="navLinks">
          <Link to="/explore">
            <li> Home </li>
          </Link>
          <Link to="/explore">
            <li> Home </li>
          </Link>
          <Link to="/explore">
            <li> Home </li>
          </Link>
        </ul>
      </header>
    );
}

export default Nav;
