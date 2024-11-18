import { z } from "zod";
import { BaseModel } from "./baseModel";
import { Movie } from "./movie";
import { Model, RelationMappings, Transaction } from "objection";

export const genreSchema = z.object({
  name: z.string(),
});

export type GenreSchemeType = z.infer<typeof genreSchema>;

export class Genre extends BaseModel {
    static get tableName() {
        return 'genres';
    }

    static relationMappings = {
        movies: {
          relation: BaseModel.ManyToManyRelation,
          modelClass: Movie,
          join: {
            from: 'genres.id',
            through: {
              from: 'movie_genres.genre_id',
              to: 'movie_genres.movie_id',
            },
            to: 'movies.id',
          }
        }
    }

    name!: string;
    movies?: Movie[];
}