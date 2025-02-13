import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import {
  WatchedMoviesType,
  MovieSearchType,
  WatchedMovieType,
} from "../types/moviesTypes";
import { average } from "../utils/helpers";
import { useDebounce } from "../hooks/debounced";

interface MoviesContextType {
  movies: MovieSearchType[];
  watched: WatchedMoviesType;
  avgImdbRating: number;
  avgUserRating: number;
  avgRuntime: number;
  watchedLength: number | undefined;
  foundMovies: number;
  isLoading: boolean;
  error: string;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  selectedId: string | null;
  handleSelectMovie: (id: string) => void;
  handleCloseMovie: () => void;
  handleAddWatched: (movie: WatchedMovieType) => void;
  handleDeleteWatched: (id: string) => void;
}

export const MoviesContext = createContext<MoviesContextType | undefined>(
  undefined
);

interface MoviesProviderType {
  children: ReactNode;
}

export default function MoviesProvider({ children }: MoviesProviderType) {
  const [movies, setMovies] = useState<MovieSearchType[]>([]);
  const [watched, setWatched] = useState<WatchedMoviesType>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_API_KEY
          }&s=${debouncedQuery}`,
          { signal: controller.signal }
        );

        if (!response.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await response.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.log(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (debouncedQuery.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();
    handleCloseMovie();

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  function handleSelectMovie(id: string) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie: WatchedMovieType) {
    setWatched((watched) => [...watched!, movie]);
    handleCloseMovie();
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  const avgImdbRating = average(watched?.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched?.map((movie) => movie.userRating));
  const avgRuntime = average(watched?.map((movie) => movie.runtime));
  const watchedLength = watched?.length;
  const foundMovies = movies.length;

  return (
    <MoviesContext.Provider
      value={{
        movies,
        watched,
        avgImdbRating,
        avgUserRating,
        avgRuntime,
        watchedLength,
        foundMovies,
        isLoading,
        error,
        query,
        setQuery,
        selectedId,
        handleSelectMovie,
        handleCloseMovie,
        handleAddWatched,
        handleDeleteWatched,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
