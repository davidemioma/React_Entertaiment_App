import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { collection, onSnapshot } from "@firebase/firestore";
import RowItem from "../row-item/RowItem";
import classes from "./SearchRow.module.css";
import List from "../lists/List";

const SearchRow = () => {
  const searchValue = useSelector((state) => state.search.searchValue);

  const currentUser = useSelector((state) => state.user.user);

  const [allMovies, setAllMovies] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "movies"), (snapshot) =>
        setAllMovies(snapshot.docs)
      ),
    [db]
  );

  const movies = allMovies?.filter((movie) =>
    movie.data().title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className={classes.row}>
      <h2>{`Found ${movies.length} result for ${
        searchValue !== "" ? searchValue : `""`
      }`}</h2>

      <List>
        {movies.map((movie) => (
          <RowItem
            key={movie.id}
            id={movie.id}
            uid={currentUser.uid}
            username={currentUser.username}
            regular={movie.data().regular}
            year={movie.data().year}
            category={movie.data().category}
            rating={movie.data().rating}
            title={movie.data().title}
          />
        ))}
      </List>
    </div>
  );
};

export default SearchRow;
