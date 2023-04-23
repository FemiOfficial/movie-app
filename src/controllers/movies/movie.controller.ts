import { Request, Response } from "express";
import { MovieService } from "./movie.service";
import { ServerErrorException } from "../../exception/serverError";
import { HTTP } from "../../consts";
import { IMovieController } from "../../types/common.types";

export const MovieController = (
  movieService: MovieService
): IMovieController => {
  return {
    async getMovies(req: Request, res: Response) {
      const [movies, error] = await movieService.getMovies();

      if (error) throw new ServerErrorException(error.message);

      return res
        .status(HTTP.OK)
        .json({ data: { movies }, message: "Movies retrieved successfully" });
    },
  };
};
