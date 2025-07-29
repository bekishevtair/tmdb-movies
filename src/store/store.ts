import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import modalReducer from "./modalSlice";
import movieReducer from "./movieSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    modal: modalReducer,
    movie: movieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
