import "express-async-errors";
import express from "express";

import { createMoviesRouter } from "./routers/movies.router";
import { BadRequestHandler, serverErrorHandler } from "./utils/error";

import type {
  ICharactersController,
  ICommentController,
  IMovieController,
} from "./types/common.types";
import { createCharacterRouter } from "./routers/character.router";
import { createCommentRouter } from "./routers/comment.router";

export const appFactory = (
  movieController: IMovieController,
  characterController: ICharactersController,
  commentController: ICommentController,
  cors: any
) => {
  const app = express();
  const moviesRouter = createMoviesRouter(movieController);
  const chractersRouter = createCharacterRouter(characterController);
  const commentsRouter = createCommentRouter(commentController);

  app.use(cors);

  app.use(express.json());
  app.use(moviesRouter);
  app.use(chractersRouter);
  app.use(commentsRouter);

  
  app.use(BadRequestHandler);
  app.use(serverErrorHandler);

  return app;
};
