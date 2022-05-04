import { collection, onSnapshot } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import BookmarkBtn from "../bookmark-button/BookmarkBtn";
import Spinner from "../spinner/Spinner";
import classes from "./TrendingRow.module.css";

const TrendingRow = () => {
  const currentUser = useSelector((state) => state.user.user);

  const [movies, setMovies] = useState([]);

  const [trending, setTrending] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "movies"), (snapshot) =>
        setMovies(snapshot.docs)
      ),
    [db]
  );

  useEffect(() => {
    setTrending(movies?.filter((movie) => movie.data().isTrending === true));
  }, [movies]);

  return (
    <div className={classes.trending}>
      <h2>Trending</h2>

      {movies.length > 0 ? (
        <div
          className={classes.lists}
          style={{ gridTemplateColumns: `repeat(${trending.length}, 1fr)` }}
        >
          {trending?.map((movie) => (
            <div key={movie.id} className={classes.item}>
              <img
                className={classes.bg_img}
                src={movie.data().trending}
                alt=""
              />

              <BookmarkBtn
                id={movie.id}
                uid={currentUser.uid}
                username={currentUser.username}
              />

              <div className={classes.content}>
                <div className={classes.info}>
                  <span>{movie.data().year}</span>

                  <div className={classes.dot} />

                  <div>
                    <img
                      className={classes.logo}
                      src={
                        movie.data().category === "movie"
                          ? "/assets/icon-nav-movies.svg"
                          : "/assets/icon-nav-tv-series.svg"
                      }
                      alt=""
                    />
                  </div>

                  <span className={classes.category}>
                    {movie.data().category}
                  </span>

                  <div className={classes.dot} />

                  <span>{movie.data().rating}</span>
                </div>

                <h2>{movie.data().title}</h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default TrendingRow;
