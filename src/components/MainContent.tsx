import Box from "./Box";
import MoviesList from "./MoviesList";
import WatchedMoviesList from "./WatchedMoviesList";
import WatchedSummery from "./WatchedSummery";

export default function MainContent() {
  return (
    <main className="main">
      <Box>
        <MoviesList />
      </Box>
      <Box>
        <WatchedSummery />
        <WatchedMoviesList />
      </Box>
    </main>
  );
}
