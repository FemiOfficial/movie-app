import { MovieRepository } from "../../repositories/movie.repository";
import { ISwapApiClient } from "../../types/common.types";
import { MovieController } from "./movie.controller";
import { MovieService } from "./movie.service";
import { CharacterRepository } from "../../repositories/character.repository";
import { CommentRepository } from "../../repositories/comment.repository";

export const createMovieController = (movieService: MovieService) => {
  return MovieController(movieService);
};

export const createMoviesService = (
  movieRepository: MovieRepository,
  characterRepository: CharacterRepository,
  commentRepository: CommentRepository,
  swapClient: ISwapApiClient
) => {
  return new MovieService(movieRepository, characterRepository, commentRepository, swapClient);
};
