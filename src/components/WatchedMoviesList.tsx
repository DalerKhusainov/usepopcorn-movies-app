import WatchedMovieCard from "./WatchedMovieCard";
import { useMoviesContext } from "../hooks/useMovieContext";

export default function WatchedMoviesList() {
  const { watched } = useMoviesContext();

  return (
    <ul className="list">
      {watched?.map((movie) => (
        <WatchedMovieCard movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
