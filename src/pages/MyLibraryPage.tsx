import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import MoviesList from "../features/movies/components/MoviesList";
import { useEffect } from "react";
import { fetchFavoriteMovies } from "../store/favoriteMoviesSlice";

const MyLibrary = () => {
  const favoriteMovies = useSelector(
    (store: RootState) => store.favoriteMovies.favoriteMoviesList,
  );
  console.log(favoriteMovies);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (favoriteMovies) {
      dispatch(fetchFavoriteMovies());
    }
  }, []);

  return (
    <>
      <MoviesList movies={favoriteMovies} />
    </>
  );
};

export default MyLibrary;
