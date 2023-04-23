import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { CommentRepository } from "../../repositories/comment.repository";
import { MovieService } from "controllers/movies/movie.service";

export const createCommentController = (commentService: CommentService, movieService: MovieService) => {
  return CommentController(commentService, movieService);
};

export const createCommentService = (
  commentRepository: CommentRepository,
) => {
  return new CommentService(commentRepository);
};
