import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { InterfaceMovie } from "../features/movies/types/InterfaceMovie";
import { getFavoriteMovies } from "../features/movies/api";

interface InterfaceInitialState {
  favoriteMoviesList: InterfaceMovie[];
  status: "idle" | "loading" | "succeded" | "failed";
  error: string | null;
}

const initialState: InterfaceInitialState = {
  favoriteMoviesList: [],
  status: "idle",
  error: null,
};

const fetchFavoriteMovies = createAsyncThunk(
  "favoriteMovies/fetchFavoriteMovies",
  async () => {
    const favoriteMovies = await getFavoriteMovies();
    return favoriteMovies;
  },
);

const favoriteMoviesSlice = createSlice({
  name: "getFavoriteMovies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFavoriteMovies.fulfilled, (state, action) => {
      if (action.payload) {
        state.favoriteMoviesList = action.payload;
      }
    });
  },
});

export { fetchFavoriteMovies };
export default favoriteMoviesSlice.reducer;
