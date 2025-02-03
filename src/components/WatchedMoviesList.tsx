import { useContext } from "react";
import { MoviesContext } from "../context/moviesContext";
import WatchedMovieCard from "./WatchedMovieCard";

export default function WatchedMoviesList() {
  const moviesContext = useContext(MoviesContext);
  if (!moviesContext) return;
  const { watched } = moviesContext;

  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieCard movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
