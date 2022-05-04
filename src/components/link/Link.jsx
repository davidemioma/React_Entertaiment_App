import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Link.module.css";

const Link = ({ to, img }) => {
  return (
    <NavLink to={to} className={(nav) => (nav.isActive ? classes.active : "")}>
      <img src={img} alt="" />
    </NavLink>
  );
};

export default Link;
