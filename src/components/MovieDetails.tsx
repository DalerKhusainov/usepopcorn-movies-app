import { useContext, useState, useEffect } from "react";
import { MoviesContext } from "../context/moviesContext";
import StarRating from "./StarRating";
import { MovieType } from "../types/moviesTypes";
import Loader from "./Loader";

const API_KEY = "c2e2a507";

export default function MovieDetails({ selectedId }: { selectedId: string }) {
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number>(0);

  const moviesContext = useContext(MoviesContext);
  if (!moviesContext) return;
  const { handleCloseMovie, handleAddWatched, watched } = moviesContext;

  useEffect(() => {
    async function fetchMovie() {
      setIsLoading(true);
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
      );
      const data = await response.json();
      setSelectedMovie(data);
      setIsLoading(false);
    }
    fetchMovie();
  }, [selectedId]);

  useEffect(() => {
    document.title = `Movie | ${selectedMovie?.Title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [selectedMovie]);

  useEffect(() => {
    function callback(e: KeyboardEvent) {
      if (e.code === "Escape") {
        handleCloseMovie();
      }
    }

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [handleCloseMovie]);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      imdbRating: Number(selectedMovie?.imdbRating),
      title: selectedMovie?.Title,
      year: selectedMovie?.Year,
      poster: selectedMovie?.Poster,
      runtime: Number(selectedMovie?.Runtime.split(" ")[0]),
      userRating,
    };

    handleAddWatched(newWatchedMovie);
  }

  const isWatched = watched?.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleCloseMovie}>
              &larr;
            </button>
            <img
              src={selectedMovie?.Poster}
              alt={`Poster of ${selectedMovie?.Title} movie`}
            />
            <div className="details-overview">
              <h2>{selectedMovie?.Title}</h2>
              <p>
                {selectedMovie?.Released} &bull; {selectedMovie?.Runtime}
              </p>
              <p>{selectedMovie?.Genre}</p>
              <p>
                <span>⭐</span>
                {selectedMovie?.imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    defaultRating={userRating}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You've rated this movie with {watchedUserRating}{" "}
                  <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{selectedMovie?.Plot}</em>
            </p>
            <p>Starring: {selectedMovie?.Actors}</p>
            <p>Directed by {selectedMovie?.Director} </p>
          </section>
        </>
      )}
    </div>
  );
}
