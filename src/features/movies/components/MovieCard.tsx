import { memo, useEffect } from "react";
import type { InterfaceMovie } from "../types/InterfaceMovie";
import { useDispatch, useSelector } from "react-redux";
import { setMovieData } from "../../../store/movieSlice";
import { openModal } from "../../../store/modalSlice";
import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../../store/store";

interface MovieCardProps {
  movie: InterfaceMovie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { title, name, id, poster_path } = movie;
  const posterUrl = `https://image.tmdb.org/t/p/w200${poster_path}`;

  const showTrailer = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setMovieData(movie));
    dispatch(openModal());
  };
  const handleCardClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <li
      onClick={handleCardClick}
      style={{
        backgroundImage: `url(${posterUrl})`,
      }}
      className="movie_card transform cursor-pointer transition duration-100 ease-in-out hover:scale-102"
    >
      <div className="z-10 flex justify-end gap-0.5">
        <button onClick={showTrailer} className="movie_card-btn">
          ▶️
        </button>
        <button className="movie_card-btn">♥️</button>
        <button className="movie_card-btn">🔖</button>
      </div>

      <h3 className="text-md z-10 font-bold text-white">{title || name}</h3>
      <div className="movie_card-gradient" />
    </li>
  );
};

export default memo(MovieCard);
