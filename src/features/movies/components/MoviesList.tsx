import { memo } from "react";
import MovieCard from "./MovieCard";
import { shallowEqual, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import type { InterfaceMovie } from "../types/InterfaceMovie";

const MoviesList = ({ movies }: any) => {
  return (
    <ul className="movies_container">
      {movies.map((movie: any) => {
        return <MovieCard key={movie.id} movie={movie} />;
      })}
    </ul>
  );
};

export default memo(MoviesList);
