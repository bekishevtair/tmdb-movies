import { memo, useEffect } from "react";
import { type AppDispatch, type RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrailerKey,
  setTrailerKey,
  resetMovieData,
} from "../../../store/movieSlice";

const MovieTrailer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const trailerKey = useSelector((store: RootState) => store.movie.trailerKey);
  const movieID = useSelector((store: RootState) => store.movie.movieData?.id);
  const cachedMovieTrailers = useSelector(
    (store: RootState) => store.movie.cachedMovieTrailers,
  );
  const status = useSelector((store: RootState) => store.movie.status);
  const error = useSelector((store: RootState) => store.movie.error);

  useEffect(() => {
    if (!movieID) return;
    const cachedKey = cachedMovieTrailers[movieID];
    if (cachedKey) {
      dispatch(setTrailerKey(cachedKey));
    } else if (!cachedKey) {
      dispatch(fetchTrailerKey(movieID));
    }
    return () => {
      dispatch(resetMovieData());
      dispatch(setTrailerKey(null));
    };
  }, [movieID]);

  return (
    <div className="z-0 flex h-[315px] w-[560px] items-center justify-center rounded-2xl bg-black/50">
      {status === "loading" && <h3>Loading trailer...</h3>}
      {status === "failed" && <h3>{error}</h3>}
      {trailerKey && (
        <iframe
          className="z-10 rounded-2xl"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0&controls=1`}
          title="YouTube video player"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default memo(MovieTrailer);
