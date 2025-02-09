import { useContext } from "react";
import MovieCard from "./MovieCard";
import { MoviesContext } from "../context/moviesContext";

export default function MoviesList() {
  const moviesContext = useContext(MoviesContext);
  if (!moviesContext) return;
  const { movies } = moviesContext;

  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieCard movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
