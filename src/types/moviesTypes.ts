// export type WatchedMoviesType = WatchedMovieType[];

export type WatchedMovieType = {
  imdbID: string;
  imdbRating: number | undefined;
  title: string | undefined;
  year: string | undefined;
  poster: string | undefined;
  runtime: number;
  userRating: number;
  // countRatingDecisions: number;
};

export interface SearchRoot {
  Search: MovieSearchType[];
  totalResults: string;
  Response: string;
}

export interface MovieSearchType {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieType {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface Rating {
  Source: string;
  Value: string;
}
