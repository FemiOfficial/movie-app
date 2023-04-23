import "express-async-errors";
import express from "express";

import { createMoviesRouter } from "./routers/movies.router";
import { serverErrorHandler } from "./utils/error";

import type { ICharactersController, IMovieController } from "./types/common.types";
import { createCharacterRouter } from "./routers/character.router";

export const appFactory = (
  movieController: IMovieController,
  characterController: ICharactersController,
  cors: any
) => {
  const app = express();
  const moviesRouter = createMoviesRouter(movieController);
  const chractersRouter = createCharacterRouter(characterController);


  app.use(cors);

  app.use(express.json());
  app.use(moviesRouter);
  app.use(chractersRouter);

  // app.use(notFoundHandler);
  app.use(serverErrorHandler);

  return app;
};
