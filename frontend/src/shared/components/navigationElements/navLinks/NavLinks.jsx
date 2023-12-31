import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";

import "./NavLinks.css";

const NavLinks = (props) => {
  const Auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">ALL USERS</NavLink>
      </li>
      {Auth.isLoggedIn && (
        <li>
          <NavLink to={`/${Auth.userId}/places`}>MY PLACES</NavLink>
        </li>
      )}
      {Auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!Auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {Auth.isLoggedIn && (
        <li>
          <button onClick={Auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
