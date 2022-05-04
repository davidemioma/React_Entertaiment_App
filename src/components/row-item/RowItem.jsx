import React from "react";
import BookmarkBtn from "../bookmark-button/BookmarkBtn";
import classes from "./RowItem.module.css";

const RowItem = ({
  id,
  uid,
  username,
  regular,
  year,
  category,
  rating,
  title,
}) => {
  return (
    <div className={classes.row}>
      <div className={classes.image}>
        <img className={classes.bg_img} src={regular} alt="" />

        <BookmarkBtn id={id} uid={uid} username={username} />
      </div>

      <div className={classes.content}>
        <span>{year}</span>

        <div className={classes.dot} />

        <div>
          <img
            src={
              category === "movie"
                ? "/assets/icon-nav-movies.svg"
                : "/assets/icon-nav-tv-series.svg"
            }
            alt=""
          />
        </div>

        <span className={classes.category}>{category}</span>

        <div className={classes.dot} />

        <span>{rating}</span>
      </div>

      <h3>{title}</h3>
    </div>
  );
};

export default RowItem;
