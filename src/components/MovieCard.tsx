import { MovieSearchType } from "../types/moviesTypes";
import { useMoviesContext } from "../hooks/useMovieContext";
interface MovieCardProps {
  movie: MovieSearchType;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { handleSelectMovie } = useMoviesContext();

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
