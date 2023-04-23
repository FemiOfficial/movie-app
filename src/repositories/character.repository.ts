import { IQueryOptions, IResourceFilter } from "../types/common.types";
import AppDataSource from "../db/datasource";
import { Character } from "../entities/character.entity";
import { MovieCharacter } from "../entities/movie-character.entity";
import { FindOptionsWhere } from "typeorm";
import { DbTableName } from "../consts";

export class CharacterRepository {
  private readonly repository = AppDataSource.getRepository(Character);
  private readonly movieCharacterRepository = AppDataSource.getRepository(
    MovieCharacter
  );


  async getCharacterCount(filter: IResourceFilter): Promise<number | undefined> {
    return await this.repository.createQueryBuilder().where(this.getFilterQuery(filter)).getCount();
  }

  async saveMovieCharacter(
    character_id: number,
    movie_id: number
  ): Promise<MovieCharacter> {
    return await this.movieCharacterRepository.save({ character_id, movie_id });
  }

  async save(character: Partial<Character>): Promise<Character> {
    return await this.repository.save(character);
  }

  async getCharacters(
    filter: IResourceFilter = {},
    options: IQueryOptions = {}
  ): Promise<Character[] | undefined> {
    let orderQuery = {};
    if (options.sort_by)
      orderQuery[`${options.sort_by}`] = options.order ?? "DESC";

    return await this.repository
      .createQueryBuilder(DbTableName.Characters)
      .where(this.getFilterQuery(filter))
      .orderBy(orderQuery)
      .limit(options.limit).offset(options.skip)
      .getMany();
  }

  async getCharacter(filter: IResourceFilter) {
    return await this.repository.findOne({
      where: this.getFilterQuery(filter),
    });
  }

  getFilterQuery(filter: IResourceFilter) {
    const { id, character_url_id, character_gender } = filter;
    const query: FindOptionsWhere<Character> = {};
    if (id) {
      query.id = id;
    }

    if (character_url_id) {
      query.character_url_id = Number(character_url_id);
    }

    if (character_gender) {
        query.gender = character_gender;
      }
    return query;
  }
}

export const createCharacterRepository = () => new CharacterRepository();
