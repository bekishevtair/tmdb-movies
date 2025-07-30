import MoviesList from "../features/movies/components/MoviesList";
import Modal from "../components/Modal";
import MovieTrailer from "../features/movies/components/MovieTrailer";
import { shallowEqual, useSelector } from "react-redux";
import type { RootState } from "../store/store";

const HomePage = () => {
  const modalStatus = useSelector((store: RootState) => {
    return store.modal.isOpened;
  });
  const movies = useSelector(
    (store: RootState) => store.movies.moviesList,
    shallowEqual,
  );
  const status = useSelector((store: RootState) => {
    return store.movie.status;
  });
  return (
    <>
      <MoviesList movies={movies} />
      {modalStatus && (
        <Modal>
          <MovieTrailer />
        </Modal>
      )}
    </>
  );
};

export default HomePage;
