import MoviesList from "../features/movies/components/MoviesList";
import Modal from "../components/Modal";
import MovieTrailer from "../features/movies/components/MovieTrailer";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const HomePage = () => {
  const modalStatus = useSelector((store: RootState) => {
    return store.modal.isOpened;
  });
  return (
    <>
      <MoviesList />
      {modalStatus && (
        <Modal>
          <MovieTrailer />
        </Modal>
      )}
    </>
  );
};

export default HomePage;
