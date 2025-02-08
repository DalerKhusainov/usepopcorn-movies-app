import { useContext } from "react";
import { MoviesContext } from "../context/moviesContext";

export default function Search() {
  const moviesContext = useContext(MoviesContext);
  if (!moviesContext) return;
  const { query, setQuery } = moviesContext;

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
