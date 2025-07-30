import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMovieData, getTrailerKey } from "../features/movies/api";
import { type InterfaceMovie } from "../features/movies/types/InterfaceMovie";

interface InterfaceInitialState {
  movieData: InterfaceMovie | null;
  trailerKey: string | null;
  status: "idle" | "loading" | "succeded" | "failed";
  error: string | null;
  cachedMovieTrailers: Record<number, string>;
  cachedMoviesData: Record<number, InterfaceMovie>;
}

const fetchMovieData = createAsyncThunk<InterfaceMovie, number>(
  "movie/fetchMovieData",
  async (id) => {
    const movieData = await getMovieData(id);
    return movieData;
  },
);

const fetchTrailerKey = createAsyncThunk<string | null, number>(
  "movie/fetchTrailerKey",
  async (id) => {
    const key = await getTrailerKey(id);
    return key;
  },
);

const initialState: InterfaceInitialState = {
  movieData: null,
  trailerKey: null,
  status: "idle",
  error: null,
  cachedMovieTrailers: {},
  cachedMoviesData: {},
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovieData: (state, action) => {
      state.movieData = action.payload;
    },
    resetMovieData: (state) => {
      state.movieData = null;
    },
    setTrailerKey: (state, action) => {
      state.status = "idle";
      state.trailerKey = action.payload;
      if (state.movieData?.id && action.payload) {
        state.cachedMovieTrailers[state.movieData.id] = action.payload;
      }
    },
    resetTrailerKey: (state) => {
      state.trailerKey = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrailerKey.fulfilled, (state, action) => {
        state.status = "succeded";
        state.trailerKey = action.payload;
        if (state.movieData?.id && action.payload) {
          state.cachedMovieTrailers[state.movieData.id] = action.payload;
        }
      })
      .addCase(fetchTrailerKey.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTrailerKey.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch trailer";
      })
      .addCase(fetchMovieData.fulfilled, (state, action) => {
        state.movieData = action.payload;
        if (action.payload.id) {
          state.cachedMoviesData[action.payload.id] = action.payload;
        }
      })
      .addCase(fetchMovieData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch movie data";
      });
  },
});

export { fetchTrailerKey, fetchMovieData };
export const { setTrailerKey, resetTrailerKey, resetMovieData, setMovieData } =
  movieSlice.actions;
export default movieSlice.reducer;
