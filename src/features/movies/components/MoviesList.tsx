import { memo } from "react";
import MovieCard from "./MovieCard";
import { shallowEqual, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

const MoviesList = () => {
  const movies = useSelector(
    (store: RootState) => store.movies.moviesList,
    shallowEqual,
  );

  return (
    <ul className="movies_container">
      {movies.map((movie) => {
        return <MovieCard key={movie.id} movie={movie} />;
      })}
    </ul>
  );
};

export default memo(MoviesList);
