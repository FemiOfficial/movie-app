import { Movie } from "../../entities/movie.entity";
import {
  ICharacter,
  IMovie,
  IQueryOptions,
  IResourceFilter,
  ISwapApiClient,
  ResourcesType,
} from "../../types/common.types";
import { MovieRepository } from "../../repositories/movie.repository";
import { convertFromCmToFeetAndInches, extractIdFromUrl } from "../../utils/helper.util";
import { CharacterRepository } from "../../repositories/character.repository";
import { Character } from "../../entities/character.entity";
import {
  ICharacterResponse,
  ICharacterResponseData,
} from "./chracter.interface";

export class CharacrerService {
  private readonly characterRepository;

  constructor(characterRepository: CharacterRepository) {
    this.characterRepository = characterRepository;
  }
  async getCharacters(
    filter: IResourceFilter,
    options: IQueryOptions
  ): Promise<[ICharacterResponse | null, Error]> {
    try {
      // db fetch for with sorted data
      let characters = (await this.characterRepository.getCharacters(
        filter,
        options
      )) as Character[];

      const responseData: ICharacterResponseData[] = await Promise.all(
        characters.map(async (character) => {
          let response = {} as ICharacterResponseData;
          response.id = character.character_url_id;
          response.name = character.name;
          response.gender = character.gender;
          response.height = character.height;
          response.mass = character.mass;
          response.hair_color = character.hair_color;
          response.skin_color = character.skin_color;
          response.eye_color = character.eye_color;
          response.birth_year = character.birth_year;

          return response;
        })
      );

      const allWithCriteria = (await this.characterRepository.getCharacters(
        filter
      )) as ICharacter[];

      const totalHeight = allWithCriteria.length > 0 ? allWithCriteria.reduce(
        (total, character) => Number(character.height) + Number(total),
        0
      ) : 0;

      const convertedTotalHeight = totalHeight > 0 ? convertFromCmToFeetAndInches(totalHeight) : null;

      // convert to feets here
      const response = {
        data: responseData,
        meta: {
          page: options.skip / options.limit,
          limit: options.limit,
          next: (options.skip / options.limit) + 1,
          previous: options.skip > 0 ? (options.skip / options.limit) - 1 : null,
          total_count: allWithCriteria.length,
          total_height: convertedTotalHeight ? `${convertedTotalHeight.feet.toFixed(4)} feets, ${convertedTotalHeight.inches.toFixed(4)} inches`: null,
        },
      };

      return [response, null];
    } catch (error) {
      return [null, error];
    }
  }
}
