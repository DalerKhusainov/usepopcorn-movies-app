import { useEffect, useState, useContext } from "react";
import { MovieType } from "../types/moviesTypes";
import { MoviesContext } from "../context/moviesContext";

const KEY = "c2e2a507";
console.log(import.meta.env.VITE_API_KEY);

export default function MovieDetails({ selectedId }: { selectedId: string }) {
  const [movie, setMovie] = useState<MovieType | null>(null);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie!;

  console.log(
    title,
    year,
    poster,
    runtime,
    imdbRating,
    plot,
    released,
    actors,
    director,
    genre
  );

  // console.log(movie.Title);

  const moviesContext = useContext(MoviesContext);
  if (!moviesContext) return;
  const { handleCloseMovie } = moviesContext;

  useEffect(() => {
    async function fetchMovie() {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await response.json();
      setMovie(data);
    }
    fetchMovie();
  }, [selectedId]);

  return (
    <div className="details">
      <button className="btn-back" onClick={handleCloseMovie}>
        &larr;
      </button>
      <div></div>
    </div>
  );
}
