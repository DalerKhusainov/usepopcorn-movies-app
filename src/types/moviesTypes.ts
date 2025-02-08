export type TempMoviesType = TempMovieType[];
export type TempWatchedMoviesType = TempWatchedMovieType[];

export type TempMovieType = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

export type TempWatchedMovieType = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
};

export interface Root {
  Search: Search[];
  totalResults: string;
  Response: string;
}

export interface Search {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}
