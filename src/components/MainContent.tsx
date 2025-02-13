import { useContext } from "react";
import Box from "./Box";
import MoviesList from "./MoviesList";
import WatchedMoviesList from "./WatchedMoviesList";
import WatchedSummery from "./WatchedSummery";
import Loader from "./Loader";
import Error from "./Error";
import MovieDetails from "./MovieDetails";
import { MoviesContext } from "../context/moviesContext";

export default function MainContent() {
  const moviesContext = useContext(MoviesContext);
  if (!moviesContext) return;
  const { selectedId, isLoading, error, movies } = moviesContext;

  return (
    <main className="main">
      <Box>
        {isLoading && <Loader />}
        {!isLoading && !error && <MoviesList movies={movies} />}
        {error && <Error message={error} />}
      </Box>
      <Box>
        {selectedId ? (
          <MovieDetails selectedId={selectedId} />
        ) : (
          <>
            <WatchedSummery />
            <WatchedMoviesList />
          </>
        )}
      </Box>
    </main>
  );
}
