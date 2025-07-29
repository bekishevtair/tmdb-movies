import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store/store";
import { fetchTrendingMovies } from "./store/moviesSlice";
import { Route, Routes, useParams } from "react-router-dom";
import MyLibraryPage from "./pages/MyLibraryPage";
import Layout from "./components/Layout";
import MoviePage from "./pages/MoviePage";
import HomePage from "./pages/HomePage";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTrendingMovies());
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-library" element={<MyLibraryPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Route>
    </Routes>
  );
};

export default memo(App);
