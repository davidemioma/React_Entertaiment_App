import React from "react";
import Nav from "../nav/Nav";
import SearchInput from "../search/SearchInput";
import classes from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={classes.layout}>
      <Nav />

      <div className={classes.children}>
        <SearchInput />

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
