import { Movie } from '../movie';
import { commentTransformer } from './commentTransformer';
import { genreTransformer } from './genreTransformer';
import { userTransformer } from './userTransformer';

class MovieTransformer {
  transform(movie: Movie) {
    return {
      id: movie.id,
      name: movie.name,
      genres: movie.genres && genreTransformer.transformArray(movie.genres),
      director: movie.director,
      screenwriter: movie.screenwriter,
      release_year: movie.releaseYear ?? 'unknown',
      poster_url: movie.posterUrl ?? undefined,
      average_rating: movie.averageRating ?? undefined,
      comments: movie.comments
    };
  }

  transformSingle(movie: Movie) {
    return {
      id: movie.id,
      name: movie.name,
      genres: movie.genres && genreTransformer.transformArray(movie.genres),
      director: movie.director,
      screenwriter: movie.screenwriter,
      release_year: movie.releaseYear ?? 'unknown',
      description: movie.description,
      poster_url: movie.posterUrl,
      trailer_url: movie.trailerUrl,
      publisher: movie.publisher && userTransformer.transform(movie.publisher),
      comments: movie.comments && commentTransformer.transformArray(movie.comments),
      average_rating: movie.averageRating ?? undefined,
    }
  }

  transformArray(movies: Movie[]) {
    return movies.map((movie) => this.transform(movie));
  }
}

export type TransformedMovie = ReturnType<MovieTransformer['transform']>;

export const movieTransformer = new MovieTransformer();
