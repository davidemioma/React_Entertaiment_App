import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import classes from "./BookmarkBtn.module.css";

const BookmarkBtn = ({ id, uid, username }) => {
  const [bookmarks, setBookmarks] = useState([]);

  const [hasBookmarked, setHasBookmarked] = useState(false);

  useEffect(
    () =>
      onSnapshot(collection(db, "movies", id, "bookmark"), (snapshot) =>
        setBookmarks(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasBookmarked(
        bookmarks.findIndex((bookmark) => bookmark.id === uid) !== -1
      ),
    [bookmarks]
  );

  const bookmarkMovie = async () => {
    if (hasBookmarked) {
      await deleteDoc(doc(db, "movies", id, "bookmark", uid));

      await updateDoc(doc(db, "movies", id), {
        isBookmarked: false,
      });
    } else {
      await setDoc(doc(db, "movies", id, "bookmark", uid), {
        username,
      });

      await updateDoc(doc(db, "movies", id), {
        isBookmarked: true,
      });
    }
  };

  return (
    <div className={classes.container} onClick={bookmarkMovie}>
      <img
        src={
          hasBookmarked
            ? "/assets/icon-bookmark-full.svg"
            : "/assets/icon-bookmark-empty.svg"
        }
        alt=""
      />
    </div>
  );
};

export default BookmarkBtn;
