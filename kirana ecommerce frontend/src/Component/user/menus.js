import React from "react";
import { NavLink } from "react-router-dom";

const Menus = () => {
  return (
    <ul className="nav-list">
      <li><NavLink to="/shop">Shop</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>
    </ul>
  );
};

export default Menus;
