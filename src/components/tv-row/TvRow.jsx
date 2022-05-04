import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { collection, onSnapshot } from "@firebase/firestore";
import Spinner from "../spinner/Spinner";
import RowItem from "../row-item/RowItem";
import List from "../lists/List";
import classes from "./TvRow.module.css";

const TvRow = () => {
  const currentUser = useSelector((state) => state.user.user);

  const [allMovies, setAllMovies] = useState([]);

  const [tvSeries, setTvSeries] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "movies"), (snapshot) =>
        setAllMovies(snapshot.docs)
      ),
    [db]
  );

  useEffect(() => {
    setTvSeries(
      allMovies?.filter((movie) => movie.data().category === "TV Series")
    );
  }, [allMovies]);

  return (
    <div className={classes.series}>
      <h2>Tv Shows</h2>

      {allMovies.length > 0 ? (
        <List>
          {tvSeries?.map((series) => (
            <RowItem
              key={series.id}
              id={series.id}
              uid={currentUser.uid}
              username={currentUser.username}
              regular={series.data().regular}
              year={series.data().year}
              category={series.data().category}
              rating={series.data().rating}
              title={series.data().title}
            />
          ))}
        </List>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default TvRow;
