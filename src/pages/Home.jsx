import React from "react";
import MovieRow from "../components/movie-row/MovieRow";
import TrendingRow from "../components/trending-row/TrendingRow";

const Home = () => {
  return (
    <div>
      <TrendingRow />

      <MovieRow header="Recommended for you" />
    </div>
  );
};

export default Home;
