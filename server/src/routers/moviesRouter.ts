import { Router } from "express";
import { UserService } from "../services/UserService";
import { commentsRouter } from './commentsRouter';
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandler } from "../middlewares/errorHandler";
import { BadRequestError, UniqueResourceViolationError } from "../errors";
import { z } from "zod";
import { getAllMoviesSchema, getMovieByIdSchema, getMovieByNameSchema, patchMovieSchema, postMovieSchema } from "../models/movie";
import { movieService } from "../services/MovieService";
import { movieTransformer } from "../models/transformers/movieTransformer";
import { getUserByIdSchema } from "../models/user";

const moviesRouter = Router();
const userService = new UserService();

moviesRouter.get('/:id', 
    errorHandler( async (req, res) => {
      const { id } = z.object({
        id: z.coerce.number(),
      }).parse(req.params);

      const input = getMovieByIdSchema.parse({ id });

      const movie = await movieService.findById(input);
      if(!movie) {
        throw new BadRequestError('No movie with this id was found');
      }

      return movieTransformer.transformSingle(movie);
}));

moviesRouter.get('/',
    errorHandler( async (req, res) => {
      const { page, pageSize, searchTerm } = z.object({
        page: z.coerce.number(),
        pageSize: z.coerce.number(),
        searchTerm: z.coerce.string().optional()
      }).parse(req.query);

      const input = getAllMoviesSchema.parse({ page, pageSize, searchTerm});

      const movies = await movieService.all(input);
      
      return movieTransformer.transformArray(
        movies.movies.filter((movie) => movie.name.includes(input.searchTerm ?? ''))
      );
}));

moviesRouter.post('/',
    authMiddleware,
    errorHandler( async (req, res) => {

      const { id: userId } = res?.locals.user;

      const input = postMovieSchema.parse({ userId, ...req.body });

      const user = await userService
                        .findById(getUserByIdSchema.parse({ userId }));
      if (!user) {
        throw new BadRequestError('No user with that id exists');
      }

      const movieCheck = await movieService.findByName({ name: input.name });
      if (movieCheck.length >= 1) {
        throw new UniqueResourceViolationError('Movie with this name already exists');
      }

      const movie = await movieService.create(input);
    
      return movieTransformer.transform(movie);
}));

moviesRouter.patch('/:id',
  authMiddleware,
  errorHandler(async (req, res) => {
    const { id } = z.object({
      id: z.string()
    }).parse(req.params);

    const parsedMovieId = Number(id);

    const { name, director, screenwriter, releaseYear } = z.object({
      name: z.string().optional(),
      director: z.string().optional(),
      screenwriter: z.string().optional(),
      releaseYear: z.number().optional()
    }).parse(req.body);

    const { id: userId } = res?.locals.user;

    const input = patchMovieSchema.parse({
      id: parsedMovieId, 
      name, userId, director, screenwriter, releaseYear
    });

    const user = await userService.findById(getUserByIdSchema.parse({userId}));
    if (!user) {
      throw new BadRequestError('No user with this ID was found');
    }

    const movie = await movieService.update(input);
    if (!movie) {
      throw new BadRequestError('No movie with this ID was found');
    }

    return movieTransformer.transform(movie);
  })
);

moviesRouter.use('/:movieId/comments', commentsRouter);

export { moviesRouter };