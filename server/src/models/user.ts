import { BaseModel } from "./baseModel";
import { Model, RelationMappings } from "objection";
import { Movie } from "./movie";
import { Comment } from "./comment";
import { z } from "zod";

export const registerInputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(10),
});

export const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10),
});

export const getUserByIdSchema = z.object({
  userId: z.number()
})

export const getUserByNameSchema = z.object({
  name: z.string()
})

export const getUserByEmailSchema = z.object({
  email: z.string().email()
})

export type RegisterInput = z.infer<typeof registerInputSchema>;
export type LoginIput = z.infer<typeof loginInputSchema>;
export type GetUserById = z.infer<typeof getUserByIdSchema>;
export type GetUserByName = z.infer<typeof getUserByNameSchema>;
export type GetUserByEmail = z.infer<typeof getUserByEmailSchema>;

export class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get relationMappings(): RelationMappings {
    const Comment = require('./comment');
    const Movie = require('./movie');

    return {
      publishedMovies: {
        relation: Model.HasManyRelation,
        modelClass: Movie,
        join: {
          from: 'users.id',
          to: 'movies.userId',
        }
      },

      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'users.id',
          to: 'comments.userId',
        }
      }
    };
  }

  id!: number;
  name!: string;
  email!: string;
  password!: string;

  comments?: Comment[];
  publishedMovies?: Movie[];
}