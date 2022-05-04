import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setSearchValue } from "../../store/store";
import classes from "./SearchInput.module.css";

const SearchInput = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <div onClick={() => navigate("/search")} className={classes.search}>
      <img src="/assets/icon-search.svg" alt="" />

      <input
        type="text"
        placeholder="Search for movies or TV series"
        onChange={(e) => dispatch(setSearchValue(e.target.value))}
      />
    </div>
  );
};

export default SearchInput;
