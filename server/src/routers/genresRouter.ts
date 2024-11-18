import { Router } from "express";
import { genreService } from "../services/GenreService";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandler } from "../middlewares/errorHandler";
import { BadRequestError } from "../errors";
import { genreSchema } from "../models/genre";
import { genreTransformer } from "../models/transformers/genreTransformer";

const genresRouter = Router();

genresRouter.get('/',
    authMiddleware,
    errorHandler( async (req, res) => {
        return genreTransformer.transformArray(await genreService.getAll());
    })
)

genresRouter.post('/',
    authMiddleware,
    errorHandler( async (req, res) => {
  
    const input = genreSchema.parse({ ...req.body });

    if(genreService.findByName(input.name) !== undefined) {
        throw new BadRequestError("Genre with this name already exists");
    }

    const genre = await genreService.create(input);

    return genreTransformer.transform(genre);
  }));

  export { genresRouter };