import express from "express";

import type { IMovieController } from "../types/common.types";
import { GetCharacterValidatorSchema } from "../controllers/characters/ characters.middlewares";

export const createMoviesRouter = (
  movieController: IMovieController
) => {
  const movieRouter = express.Router();

  movieRouter.get("/movies", GetCharacterValidatorSchema, movieController.getMovies);
  return movieRouter;
};
