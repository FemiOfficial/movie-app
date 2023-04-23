import { Request, Response } from "express";
import { ServerErrorException } from "../../exception/serverError";
import { DEFAULT_PAGINATION_ITEMS_LIMIT, HTTP } from "../../consts";
import {
  ICommentController,
  IQueryOptions,
  IResourceFilter,
} from "../../types/common.types";
import { CommentService } from "./comment.service";
import { MovieService } from "../../controllers/movies/movie.service";
import { BadRequestException } from "../../exception/badRequest";

export const CommentController = (
  commentService: CommentService,
  movieService: MovieService
): ICommentController => {
  return {
    async getComments(req: Request, res: Response) {
      const { page, limit, movie_id, sort_by } = req.query as Record<
        string,
        string
      >;

      const movieId = Number(movie_id)

      const options: IQueryOptions = {
        limit: Number(limit ?? DEFAULT_PAGINATION_ITEMS_LIMIT),
        skip:
          Number(page ?? 0) * Number(limit ?? DEFAULT_PAGINATION_ITEMS_LIMIT),
        sort_by,
      };

      const [movieExists, fetchError] = await movieService.getMovie(movieId, true);

      if (!movieExists || fetchError) throw new BadRequestException(fetchError.message)


      const filter: IResourceFilter = {
        movie_id: movieExists.id as string
      };

      const [comments, error] = await commentService.getComments(
        filter,
        options
      );

      if (error) throw new ServerErrorException(error.message);

      return res
        .status(HTTP.OK)
        .json({
          data: { comments: comments.data.map(i => {i.movie_id = movieId; return i}), meta: comments.meta },
          message: "Comments retrieved successfully",
        });
    },
    async addComment(req: Request, res: Response) {
    
      const [movieExists, fetchError] = await movieService.getMovie(req.body.movie_id, true);

      if (!movieExists || fetchError) throw new BadRequestException(fetchError.message)

      req.body.movie_id = movieExists.id
      const [comment, error] = await commentService.addComment(req.body);

      if (error) throw new ServerErrorException(error.message);

      comment.movie_id = movieExists.movie_url_id as number;
      return res
        .status(HTTP.OK)
        .json({
          data: { comment },
          message: "Comment added succesfully",
        });
    },
  };
};
