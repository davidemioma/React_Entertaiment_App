import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/store";
import { auth } from "./firebase";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import Bookmarks from "./pages/Bookmarks";
import Search from "./pages/Search";
import Login from "./pages/login/Login";

const App = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            profileImg: user.photoURL,
            username: user.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="container">
      {currentUser ? (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/movies" element={<Movies />} />

            <Route path="/tv-shows" element={<TvShows />} />

            <Route path="/bookmarks" element={<Bookmarks />} />

            <Route path="/search" element={<Search />} />
          </Routes>
        </Layout>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
