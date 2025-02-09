import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { TempWatchedMoviesType, Search } from "../types/moviesTypes";
import { average } from "../utils/helpers";
import { useDebounce } from "../hooks/debounced";

const tempWatchedData: TempWatchedMoviesType = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

interface MoviesContextType {
  movies: Search[];
  watched: TempWatchedMoviesType;
  avgImdbRating: number;
  avgUserRating: number;
  avgRuntime: number;
  watchedLength: number;
  foundMovies: number;
  isLoading: boolean;
  error: string;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  selectedId: string | null;
  handleSelectMovie: (id: string) => void;
  handleCloseMovie: () => void;
}

export const MoviesContext = createContext<MoviesContextType | undefined>(
  undefined
);

interface MoviesProviderType {
  children: ReactNode;
}

// const KEY = import.meta.env.VITE_API_KEY;
// console.log(KEY);

export default function MoviesProvider({ children }: MoviesProviderType) {
  const [movies, setMovies] = useState<Search[]>([]);
  const [watched, setWatched] =
    useState<TempWatchedMoviesType>(tempWatchedData);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_API_KEY
          }&s=${query}`
        );

        if (!response.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await response.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
        console.log(data.Search);
      } catch (err) {
        console.error(err instanceof Error && err.message);
        setError(err instanceof Error ? err.message : "An error occured");
      } finally {
        setIsLoading(false);
      }
    }

    if (debouncedQuery.length >= 2) {
      fetchData();
    } else {
      setMovies([]);
      setError("");
    }
  }, [debouncedQuery]);

  function handleSelectMovie(id: string) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  const watchedLength = watched.length;
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
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
