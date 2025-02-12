import { useContext } from "react";
import { MoviesContext } from "../context/moviesContext";
import StarRating from "./StarRating";

export default function MovieDetails() {
  const moviesContext = useContext(MoviesContext);
  if (!moviesContext) return;
  const { handleCloseMovie, selectedMovie } = moviesContext;

  return (
    <div className="details">
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
          <StarRating maxRating={10} size={24} />
        </div>
        <p>
          <em>{selectedMovie?.Plot}</em>
        </p>
        <p>Starring: {selectedMovie?.Actors}</p>
        <p>Directed by {selectedMovie?.Director} </p>
      </section>
    </div>
  );
}
