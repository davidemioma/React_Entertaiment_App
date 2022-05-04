import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { auth } from "../../firebase";
import Link from "../link/Link";
import classes from "./Nav.module.css";

const Nav = () => {
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.user);

  return (
    <div className={classes.container}>
      <nav className={classes.nav}>
        <img onClick={() => navigate("/")} src="./assets/logo.svg" alt="" />

        <div className={classes.icons}>
          <Link to="/" img="./assets/icon-nav-home.svg" />

          <Link to="/movies" img="./assets/icon-nav-movies.svg" />

          <Link to="/tv-shows" img="./assets/icon-nav-tv-series.svg" />

          <Link to="/bookmarks" img="./assets/icon-nav-bookmark.svg" />
        </div>

        <img
          className={classes.avatar}
          onClick={() => auth.signOut()}
          src={currentUser.profileImg}
          alt=""
        />
      </nav>
    </div>
  );
};

export default Nav;
