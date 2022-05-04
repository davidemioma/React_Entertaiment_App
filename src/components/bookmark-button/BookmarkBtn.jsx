import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "@firebase/firestore";
import classes from "./BookmarkBtn.module.css";

const BookmarkBtn = ({
  id,
  uid,
  username,
  regular,
  year,
  category,
  rating,
  title,
}) => {
  const [bookmarks, setBookmarks] = useState([]);

  const [hasBookmarked, setHasBookmarked] = useState(false);

  useEffect(
    () =>
      onSnapshot(collection(db, "bookmark", uid, "item"), (snapshot) =>
        setBookmarks(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasBookmarked(
        bookmarks.findIndex((bookmark) => bookmark.id === id) !== -1
      ),
    [bookmarks]
  );

  const bookmarkMovie = async () => {
    if (hasBookmarked) {
      await deleteDoc(doc(db, "bookmark", uid, "item", id));
    } else {
      await setDoc(doc(db, "bookmark", uid, "item", id), {
        username,
        regular,
        year,
        category,
        rating,
        title,
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
