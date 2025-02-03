import { TempMovieType } from "../types/moviesTypes";

interface MovieCardProps {
  movie: TempMovieType;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <li>
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
