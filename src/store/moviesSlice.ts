import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTrendingMovies } from "../features/movies/api";
import type { InterfaceMovie } from "../features/movies/types/InterfaceMovie";

interface InterfaceInitialState {
  moviesList: InterfaceMovie[];
  status: "idle" | "loading" | "succeded" | "failed";
  error: string | null;
}

const fetchTrendingMovies = createAsyncThunk(
  "movies/fetchTrendingMovies",
  async () => {
    const movies = await getTrendingMovies();
    return movies;
  },
);

const initialState: InterfaceInitialState = {
  moviesList: [],
  status: "idle",
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.moviesList = action.payload;
        state.status = "succeded";
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export { fetchTrendingMovies };
export default moviesSlice.reducer;
