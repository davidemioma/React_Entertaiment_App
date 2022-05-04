import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { collection, onSnapshot } from "@firebase/firestore";
import Spinner from "../spinner/Spinner";
import RowItem from "../row-item/RowItem";
import List from "../lists/List";
import classes from "./MovieRow.module.css";

const MovieRow = ({ header }) => {
  const currentUser = useSelector((state) => state.user.user);

  const [allMovies, setAllMovies] = useState([]);

  const [movies, setMovies] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "movies"), (snapshot) =>
        setAllMovies(snapshot.docs)
      ),
    [db]
  );

  useEffect(() => {
    setMovies(allMovies?.filter((movie) => movie.data().category === "movie"));
  }, [allMovies]);

  return (
    <div className={classes.movies}>
      <h2>{header}</h2>

      {allMovies.length > 0 ? (
        <List>
          {movies?.map((movie) => (
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
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default MovieRow;
