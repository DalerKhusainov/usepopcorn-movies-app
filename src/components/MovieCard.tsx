import { useContext } from "react";
import { MovieSearchType } from "../types/moviesTypes";
import { MoviesContext } from "../context/moviesContext";
interface MovieCardProps {
  movie: MovieSearchType;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const moviesContext = useContext(MoviesContext);
  if (!moviesContext) return;
  const { handleSelectMovie } = moviesContext;

  return (
    <li onClick={() => handleSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
