import { useContext } from "react";
import { MoviesContext } from "../context/moviesContext";

export default function FoundResult() {
  const moviesContext = useContext(MoviesContext);
  if (!moviesContext) return;
  const { foundMovies } = moviesContext;

  return (
    <p className="num-results">
      Found <strong>{foundMovies}</strong> results
    </p>
  );
}
