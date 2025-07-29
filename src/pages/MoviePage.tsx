import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import MovieTrailer from "../features/movies/components/MovieTrailer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  fetchMovieData,
  resetMovieData,
  resetTrailerKey,
  setMovieData,
} from "../store/movieSlice";

const MoviePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movieData = useSelector((store: RootState) => store.movie.movieData);
  const { id } = useParams<{ id: string }>();
  const cachedMoviesData = useSelector(
    (store: RootState) => store.movie.cachedMoviesData,
  );
  const bannerUrl = `https://image.tmdb.org/t/p/original${movieData?.backdrop_path}`;

  useEffect(() => {
    if (!id) return;
    const cachedMovieData = cachedMoviesData[Number(id)];
    if (cachedMovieData) {
      dispatch(setMovieData(cachedMovieData));
    } else if (!cachedMovieData) {
      dispatch(fetchMovieData(Number(id)));
    }
    return () => {
      dispatch(resetMovieData());
      dispatch(resetTrailerKey());
    };
  }, [id]);

  return (
    <div
      className="movie_page"
      style={{
        backgroundImage: `url(${bannerUrl})`,
      }}
    >
      <div className="relative z-10 flex flex-col gap-10 pt-[400px] md:flex-row">
        <div className="flex w-full flex-col justify-end gap-6 md:w-7/12">
          <div className="relative z-10 flex items-end">
            <h2 className="mb-2 text-4xl font-bold md:text-7xl">
              {movieData?.name || movieData?.title}
            </h2>
          </div>

          <div className="flex flex-wrap gap-4 text-lg font-semibold text-white/90">
            {movieData?.release_date && (
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 shadow-sm">
                <span>📅 {movieData.release_date}</span>
              </div>
            )}

            {!!movieData?.vote_average && (
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 shadow-sm">
                <span>⭐ {Number(movieData.vote_average).toFixed(1)} / 10</span>
              </div>
            )}

            {movieData?.genres?.map((genre) => (
              <div
                key={genre.id}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 shadow-sm"
              >
                <span>🎭 {genre.name}</span>
              </div>
            ))}
          </div>

          <p className="text-xl font-medium">{movieData?.overview}</p>
        </div>

        <div className="flex w-full flex-col items-end justify-end gap-6 md:w-5/12">
          <MovieTrailer />
        </div>
      </div>

      <div className="movie_page-gradient" />
    </div>
  );
};

export default MoviePage;
