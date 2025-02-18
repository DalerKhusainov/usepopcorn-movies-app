import { useMoviesContext } from "../hooks/useMovieContext";

export default function FoundResult() {
  const { foundMovies } = useMoviesContext();

  return (
    <p className="num-results">
      Found <strong>{foundMovies}</strong> results
    </p>
  );
}
