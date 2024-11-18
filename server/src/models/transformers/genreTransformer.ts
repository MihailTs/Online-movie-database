import { Genre } from '../genre';

export type TransformedGenre = ReturnType<GenreTransformer['transform']>;

class GenreTransformer {
  transform(genre: Genre) {
    return {
      id: genre.id,
      name: genre.name,
    };
  }

  transformArray(genres: Genre[]) {
    return genres.map((g) => this.transform(g));
  }
}

export const genreTransformer = new GenreTransformer();
