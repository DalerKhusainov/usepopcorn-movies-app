import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { MovieSearchType, WatchedMovieType } from "../types/moviesTypes";
import { average } from "../utils/helpers";
import { useMovies } from "../hooks/useMovies";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
interface MoviesContextType {
  movies: MovieSearchType[];
  watched: WatchedMovieType[] | null;
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
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
  const [watched, setWatched] = useLocalStorageState<WatchedMovieType[] | null>(
    [],
    "watched"
  );

  function handleSelectMovie(id: string) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie: WatchedMovieType) {
    setWatched((watched) => [...watched!, movie]);
    // setWatchedTest((watched) => [...watched!, movie]);
    handleCloseMovie();
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched) => watched!.filter((movie) => movie.imdbID !== id));
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
