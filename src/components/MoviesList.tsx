import MovieCard from "./MovieCard";
import { MovieSearchType } from "../types/moviesTypes";

export default function MoviesList({ movies }: { movies: MovieSearchType[] }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieCard movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
