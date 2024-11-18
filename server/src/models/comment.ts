import { BaseModel } from "./baseModel";
import { Model } from "objection";
import { Movie } from "./movie";
import { User } from "./user";
import { z } from "zod";

export const postCommentSchema = z.object({
  userId: z.number(),
  movieId: z.number(),
  text: z.string(),
  rating: z.number().gte(0).lte(10).optional()
});

export const getCommentSchema = z.object({
  commentId: z.number(),
  movieId: z.number()
});

export const getAllCommentsSchema = z.object({
  movieId: z.number()
});

export const patchCommentSchema = z.object({
  movieId: z.number(),
  commentId: z.number(),
  text: z.string(),
  rating: z.number().gte(0).lte(10).optional()
});

export const deleteCommentSchema = z.object({
  commentId: z.number(),
});

export type PostComment = z.infer<typeof postCommentSchema>;
export type GetMovieComment = z.infer<typeof getCommentSchema>;
export type GetAllMovieComments = z.infer<typeof getAllCommentsSchema>;
export type PatchComment = z.infer<typeof patchCommentSchema>;
export type DeleteComment = z.infer<typeof deleteCommentSchema>;

export class Comment extends BaseModel {
    static get tableName() {
        return 'comments';
    }

    static get relationMappings() {

      return { 
        movie: {
          relation: Model.BelongsToOneRelation,
          modelClass: Movie,
          join: {
            from: 'comments.movieId',
            to: 'movies.id'
          }
        },
        author: {
          relation: Model.BelongsToOneRelation,
          modelClass: User,
          join: {
            from: 'comments.userId',
            to: 'users.id'
          }
        }
      };
    }

    text!: string;
    userId!: number;
    movieId!: number;
    rating!: number;

    author?: User;
    movie?: Movie;
}