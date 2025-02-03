import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { TempWatchedMoviesType, TempMoviesType } from "../types/moviesTypes";
import { average } from "../utils/helpers";

const tempMovieData: TempMoviesType = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

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
  movies: TempMoviesType;
  watched: TempWatchedMoviesType;
  avgImdbRating: number;
  avgUserRating: number;
  avgRuntime: number;
  watchedLength: number;
  foundMovies: number;
}

export const MoviesContext = createContext<MoviesContextType | undefined>(
  undefined
);

interface MoviesProviderType {
  children: ReactNode;
}

export default function MoviesProvider({ children }: MoviesProviderType) {
  const [movies, setMovies] = useState<TempMoviesType>(tempMovieData);
  const [watched, setWatched] =
    useState<TempWatchedMoviesType>(tempWatchedData);

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
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
