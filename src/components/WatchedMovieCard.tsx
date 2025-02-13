import { useContext } from "react";
import { WatchedMovieType } from "../types/moviesTypes";
import { MoviesContext } from "../context/moviesContext";
interface WatchedMovieCardProps {
  movie: WatchedMovieType;
}

export default function WatchedMovieCard({ movie }: WatchedMovieCardProps) {
  const moviesContext = useContext(MoviesContext);
  if (!moviesContext) return;
  const { handleDeleteWatched } = moviesContext;

  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => handleDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
