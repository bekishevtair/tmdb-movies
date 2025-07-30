import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import modalReducer from "./modalSlice";
import movieReducer from "./movieSlice";
import favoriteMoviesReducer from "./favoriteMoviesSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    modal: modalReducer,
    movie: movieReducer,
    favoriteMovies: favoriteMoviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
