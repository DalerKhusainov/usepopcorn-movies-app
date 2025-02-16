import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounced";
import { MovieSearchType } from "../types/moviesTypes";

export function useMovies(query: string, callback?: () => void) {
  const [movies, setMovies] = useState<MovieSearchType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

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
    callback!();

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  return { movies, isLoading, error };
}
