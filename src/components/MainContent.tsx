import Box from "./Box";
import MoviesList from "./MoviesList";
import WatchedMoviesList from "./WatchedMoviesList";
import WatchedSummery from "./WatchedSummery";
import Loader from "./Loader";
import Error from "./Error";
import MovieDetails from "./MovieDetails";
import { useMoviesContext } from "../hooks/useMovieContext";

export default function MainContent() {
  const { selectedId, isLoading, error, movies } = useMoviesContext();

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
