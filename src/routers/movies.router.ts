import express from "express";

import type { IMovieController } from "../types/common.types";

export const createMoviesRouter = (
  movieController: IMovieController
) => {
  const movieRouter = express.Router();

  movieRouter.get("/movies", movieController.getMovies);
  return movieRouter;
};
