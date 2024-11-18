import { Movie } from "../models/movie";
import { Comment, DeleteComment, GetAllMovieComments, GetMovieComment, PatchComment, PostComment } from "../models/comment";
import { z } from "zod";

export type CommentWithAuthorName = Comment & { author: string }

export class CommentService {
  /**
   * Creates a comment
   *
   * @returns The newly created comment
   */
  async create(input: PostComment): Promise<Comment> {
    return await Comment.query().insert({
      text: input.text,
      movieId: input.movieId,
      userId: input.userId,
      rating: input.rating
    });
  }

  async update(input: PatchComment): Promise<Comment | undefined> {
    return await Movie.transaction(async trx => {
      const updateData : any = { input, updated_at: new Date() };

      await Comment.query(trx)
        .where('id', '=', input.commentId)
        .where('movieId', '=', input.movieId)
        .patch(updateData);

      const updatedComment = await Comment.query(trx)
                                          .findById(input.commentId);

      return updatedComment;
    });
  }

  /**
   * Deletes a comment
   */
  async delete(input: DeleteComment): Promise<void> {
    await Comment.query().deleteById(input.commentId);
  }

  async findById(id: number): Promise<Comment | undefined> {
    return await Comment.query().findById(id);
  }

  /**
   * Returns all comments for a specific movie, including the user names of the
   * comment authors
   */
  async allForMovie(input: GetAllMovieComments) {
    return await Comment.query()
      .where('movie_id', input.movieId)
      .withGraphFetched('author')
      .orderBy('comments.updated_at', 'desc');
  }
}

export const commentService = new CommentService();