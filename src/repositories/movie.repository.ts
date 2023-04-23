import { IQueryOptions, IResourceFilter } from "../types/common.types";
import AppDataSource from "../db/datasource";
import { Movie } from "../entities/movie.entity";
import { FindOptionsWhere } from "typeorm";
import { DbTableName } from "../consts";

export class MovieRepository {
  private readonly repository = AppDataSource.getRepository(Movie);
  async save(movie: Partial<Movie>): Promise<Movie | undefined> {
    return await this.repository.save(movie);
  }

  async getMovies(
    filter: IResourceFilter = {},
    options: IQueryOptions = {}
  ): Promise<Movie[] | undefined> {

    let orderQuery = {};
    if (options.sort_by) orderQuery[`${options.sort_by}`] = options.order ?? 'DESC';

    return await this.repository
      .createQueryBuilder(DbTableName.Movies)
      .where(this.getFilterQuery(filter))
      .orderBy(orderQuery)
      .limit(options.limit).offset(options.skip)
      .getMany();
  }

  async getMovie(filter: IResourceFilter) {
    return await this.repository.findOne({
      where: this.getFilterQuery(filter),
    });
  }

  getFilterQuery(filter: IResourceFilter) {
    const { episode_id, id, movie_url_id } = filter;
    const query: FindOptionsWhere<Movie> = {};
    if (id) {
      query.id = id;
    }

    if (movie_url_id) {
      query.movie_url_id = Number(movie_url_id);
    }

    if (episode_id) query.episode_id = episode_id;
    return query;
  }
}

export const createMovieRepository = () => new MovieRepository();
