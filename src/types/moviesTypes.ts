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
