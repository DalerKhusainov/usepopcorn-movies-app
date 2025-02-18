import { useContext } from "react";
import { MoviesContext } from "../context/moviesContext";

export function useMoviesContext() {
  const moviesContext = useContext(MoviesContext);

  if (!moviesContext) {
    throw new Error("useMoviesContext must be used within a MoviesProvider");
  }

  return moviesContext;
}
