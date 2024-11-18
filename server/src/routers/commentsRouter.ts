import { Router } from "express";
import { userService } from "../services/UserService";
import { movieService } from "../services/MovieService";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandler } from "../middlewares/errorHandler";
import { BadRequestError } from "../errors";
import { z } from "zod";
import { commentTransformer } from "../models/transformers/commentTransformer";
import { getUserByIdSchema } from "../models/user";
import { getMovieByIdSchema } from "../models/movie";
import { deleteCommentSchema, getAllCommentsSchema, patchCommentSchema, postCommentSchema } from "../models/comment";
import { commentService } from "../services/CommentService";

const commentsRouter = Router({ mergeParams: true });

commentsRouter.get('/',
  errorHandler( async (req) => {
    const { movieId } = z.object({
      movieId: z.coerce.number()
    }).parse(req.params);

    const input = getAllCommentsSchema.parse({ movieId });

    const movieCommented = await movieService
                              .findById(getMovieByIdSchema.parse({ id: movieId }));
                              
    if (!movieCommented) {
      throw new BadRequestError('No movie with this id was found');
    }

    const allComments = await commentService.allForMovie(input);
  
    return commentTransformer.transformArray(allComments);
})
); 

commentsRouter.post('/',
  authMiddleware,
  errorHandler( async (req, res) => {
    const { id: userId } = res?.locals.user;
    const { movieId } = z.object({
      movieId: z.coerce.number(),
    }).parse(req.params);

    const input = postCommentSchema.parse({
      userId, movieId, ...req.body
    });
      
    const user = await userService
                      .findById(getUserByIdSchema.parse({ userId }));
    if (!user) {
      throw new BadRequestError('No user with this id was found');
    }

    const movieCommented = await movieService
                                .findById(getMovieByIdSchema.parse({ id: movieId }));
    if (!movieCommented) {
      throw new BadRequestError('No movie with this id was found');
    }

    const newComment = await commentService.create(input);
    
    return commentTransformer.transform(newComment);
  })
); 

commentsRouter.patch('/:commentId',
    authMiddleware,
    errorHandler( async (req, res) => {
      const { movieId, commentId } = z.object({
        movieId: z.coerce.number(),
        commentId: z.coerce.number()
      }).parse(req.params);

      const input = patchCommentSchema.parse({
        commentId, movieId, ...req.body
      });

      const movieCommented = await movieService
                                  .findById(getMovieByIdSchema.parse({ movieId }));
      if (!movieCommented) {
        throw new BadRequestError('No movie with this id was found');
      }

      const updatedComment = await commentService.update(input);
      if (!updatedComment) {
        return { message: "No comment was updated" };
      }

      return commentTransformer.transform(updatedComment);
    })
); 

commentsRouter.delete('/:commentId',
    authMiddleware,
    errorHandler( async (req, res) => {
      const { movieId, commentId } = z.object({
        movieId: z.coerce.number(),
        commentId: z.coerce.number()
      }).parse(req.params);

      const input = deleteCommentSchema.parse({ commentId });

      const movieCommented = await movieService
                                  .findById(getMovieByIdSchema.parse({ movieId }));

      if (!movieCommented) {
        throw new BadRequestError('No movie with this id was found');
      }

      const deleted = commentService.delete(input);
      return { message: `${deleted} resources were deleted`};
    })
); 

export { commentsRouter };