import { AUTHORIZATION } from "../../../constants/constants";
import type { InterfaceVideo } from "../types/InterfaceVideo";
import type { InterfaceMovie } from "../types/InterfaceMovie";

const getOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: AUTHORIZATION,
  },
};

export const getTrendingMovies = async (): Promise<InterfaceMovie[]> => {
  try {
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      getOptions,
    );
    const res = await data.json();
    return res.results;
  } catch (err) {
    throw err;
  }
};

export const getMovieData = async (movieID: number | null): Promise<any> => {
  if (!movieID) return null;
  try {
    const movieData = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
      getOptions,
    );
    const movie = await movieData.json();
    return movie;
  } catch (err) {
    throw err;
  }
};

export const getTrailerKey = async (
  movieID: number,
): Promise<string | null> => {
  if (!movieID) return null;
  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`,
      getOptions,
    );
    const videos = await data.json();
    const trailerKey = videos.results.find(
      (video: InterfaceVideo) => video.type === "Trailer",
    ).key;
    return trailerKey;
  } catch (err) {
    throw new Error("Trailer not found for this movie.");
  }
};
