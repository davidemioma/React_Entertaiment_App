import React from "react";
import classes from "./List.module.css";

const List = ({ children }) => {
  return <div className={classes.lists}>{children}</div>;
};

export default List;
