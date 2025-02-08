import { useContext } from "react";
import Box from "./Box";
import MoviesList from "./MoviesList";
import WatchedMoviesList from "./WatchedMoviesList";
import WatchedSummery from "./WatchedSummery";
import Loader from "./Loader";
import Error from "./Error";
import { MoviesContext } from "../context/moviesContext";

export default function MainContent() {
  const moviesContext = useContext(MoviesContext);
  if (!moviesContext) return;
  const { isLoading, error } = moviesContext;

  return (
    <main className="main">
      <Box>
        {isLoading && <Loader />}
        {!isLoading && !error && <MoviesList />}
        {error && <Error message={error} />}
      </Box>
      <Box>
        <WatchedSummery />
        <WatchedMoviesList />
      </Box>
    </main>
  );
}
