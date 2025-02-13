import { useContext } from "react";
import { MoviesContext } from "../context/moviesContext";

export default function WatchedSummery() {
  const moviesContext = useContext(MoviesContext);
  if (!moviesContext) return;
  const { watchedLength, avgImdbRating, avgUserRating, avgRuntime } =
    moviesContext;

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watchedLength} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}
