import { BaseModel } from "./baseModel";
import { Genre } from "./genre";
import { User } from "./user";
import { Comment } from "./comment";
import { z } from "zod";

export const getMovieByIdSchema = z.object({
  id: z.number()
})

export const getMovieByNameSchema = z.object({
  name: z.string()
})

export const getAllMoviesSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  searchTerm: z.string().optional()
});

export const postMovieSchema = z.object({
  name: z.string(),
  userId: z.number(),
  genres: z.array(z.string()).optional(),
  director: z.string().optional(),
  screenwriter: z.string().optional(),
  release_year: z.number().gte(1900).lte(new Date().getFullYear() + 2).optional(),
  trailer_url: z.string().optional(),
  poster_url: z.string().optional(),
  description: z.string().optional()
});

export const patchMovieSchema = z.object({
  id: z.number(),
  name: z.string(),
  director: z.string().optional(),
  screenwriter: z.string().optional(),
  release_year: z.number().gte(1900).lte(new Date().getFullYear() + 2).optional(),
  trailer_url: z.string().optional(),
  poster_url: z.string().optional(),
  description: z.string().optional()
});

export type GetMovieById = z.infer<typeof getMovieByIdSchema>;
export type GetMovieByName = z.infer<typeof getMovieByNameSchema>;
export type GetAllMovies = z.infer<typeof getAllMoviesSchema>;
export type PostMovie = z.infer<typeof postMovieSchema>;
export type PatchMovie = z.infer<typeof patchMovieSchema>;

export class Movie extends BaseModel {
    static get tableName() {
      return 'movies';
    }

    static get relationMappings () {
      return {
        comments: {
          relation: BaseModel.HasManyRelation,
          modelClass: Comment,
          join: {
            from: 'movies.id',
            to: 'comments.movieId'
          }
        },
        publisher: {
          relation: BaseModel.BelongsToOneRelation,
          modelClass: User,
          join: {
            from: 'movies.userId',
            to: 'users.id'
          }
        },
        genres: {
          relation: BaseModel.ManyToManyRelation,
          modelClass: Genre,
          join: {
            from: 'movies.id',
            through: {
              from: 'movie_genres.movieId', 
              to: 'movie_genres.genreId'
            },
              to: 'genres.id'
          }
        }
      }
    };

    name!: string;
    userId!: number;
    director?: string;
    screenwriter?: string;
    releaseYear?: number;
    description?: string;
    posterUrl?: string;
    trailerUrl?: string;
    averageRating?: number;

    genres?: Genre[];
    publisher?: User;
    comments?: Comment[];
}