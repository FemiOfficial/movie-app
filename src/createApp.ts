import "./utils/config/config.validator";
import "reflect-metadata";
import cors from "cors";
import { getAllowedHosts, HTTP, NODE_ENV } from "./consts";
import { appFactory } from "./app";
import {
  createMovieController,
  createMoviesService,
} from "./controllers/movies";
import "./utils/validateEnv";
import "./db/datasource";
import { createMovieRepository } from "./repositories/movie.repository";
import { createCharacterRepository } from "./repositories/character.repository";
import { SwapApiClient } from "./apiclient/swap.apiclient";
import { configHelper } from "./utils/config/config.helpers";
import { httpClient } from "./utils/http-client";
import { createCommentRepository } from "./repositories/comment.repository";
import {
  createCharacterController,
  createCharacterService,
} from "./controllers/characters";
import {
  createCommentController,
  createCommentService,
} from "./controllers/comments";

const corsOptions: cors.CorsOptions = {
  origin: process.env.NODE_ENV === NODE_ENV ? getAllowedHosts() : "*",
  optionsSuccessStatus: HTTP.OK,
};

const corsMiddleware = cors(corsOptions);
const movieRepository = createMovieRepository();
const characterepository = createCharacterRepository();
const commentRepository = createCommentRepository();
const swapClient = SwapApiClient(httpClient, configHelper);

const moviesService = createMoviesService(
  movieRepository,
  characterepository,
  commentRepository,
  swapClient
);
const characterService = createCharacterService(characterepository);
const commentService = createCommentService(commentRepository);

const movieController = createMovieController(moviesService);
const characterController = createCharacterController(characterService);
const commentController = createCommentController(commentService, moviesService);

const app = appFactory(
  movieController,
  characterController,
  commentController,
  corsMiddleware
);

export default app;
