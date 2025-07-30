import { API_KEY, AUTHORIZATION } from "../../../constants/constants";
import type { InterfaceVideo } from "../types/InterfaceVideo";
import type { InterfaceMovie } from "../types/InterfaceMovie";

const options = (method: string) => {
  return {
    method: method,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: AUTHORIZATION,
    },
  };
};

export const getTrendingMovies = async (): Promise<InterfaceMovie[]> => {
  try {
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options("GET"),
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
      options("GET"),
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
      options("GET"),
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

export const addFavorite = async (movieID: number | null) => {
  if (!movieID) return null;
  fetch(
    "https://api.themoviedb.org/3/account/22166628/favorite",
    options("POST"),
  )
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

export const getFavoriteMovies = async () => {
  try {
    const data = await fetch(
      "https://api.themoviedb.org/3/account/22166628/favorite/movies?language=en-US&page=1&sort_by=created_at.asc",
      options("GET"),
    );
    const res = await data.json();
    return res.results;
  } catch (err) {
    throw new Error("Failed fetching favorite movies");
  }
};
