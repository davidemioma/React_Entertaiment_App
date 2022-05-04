import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { collection, onSnapshot } from "@firebase/firestore";
import List from "../lists/List";
import RowItem from "../row-item/RowItem";
import Spinner from "../spinner/Spinner";
import classes from "./BookmarkRow.module.css";

const BookmarkRow = () => {
  const currentUser = useSelector((state) => state.user.user);

  const [movies, setMovies] = useState([]);

  const [bookmarks, setBookmarks] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "movies"), (snapshot) =>
        setMovies(snapshot.docs)
      ),
    [db]
  );

  useEffect(() => {
    setBookmarks(movies?.filter((movie) => movie.data().isBookmarked === true));
  }, [movies]);

  return (
    <div className={classes.bookmark}>
      <h2>Bookmarks</h2>

      {movies.length > 0 ? (
        <List>
          {bookmarks.map((item) => (
            <RowItem
              key={item.id}
              id={item.id}
              uid={currentUser.uid}
              username={currentUser.username}
              regular={item.data().regular}
              year={item.data().year}
              category={item.data().category}
              rating={item.data().rating}
              title={item.data().title}
            />
          ))}
        </List>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default BookmarkRow;
