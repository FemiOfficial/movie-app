import { Request, Response } from "express";
import { CharacterService } from "./character.service";
import { ServerErrorException } from "../../exception/serverError";
import { DEFAULT_PAGINATION_ITEMS_LIMIT, HTTP } from "../../consts";
import {
  ICharactersController,
  IQueryOptions,
  IResourceFilter,
} from "../../types/common.types";

export const CharacterController = (
  CharacterService: CharacterService
): ICharactersController => {
  return {
    async getCharacters(req: Request, res: Response) {
      const { page, limit, character_gender, sort_by } = req.query as Record<
        string,
        string
      >;

      const options: IQueryOptions = {
        limit: Number(limit ?? DEFAULT_PAGINATION_ITEMS_LIMIT),
        skip:
          Number(page ?? 0) * Number(limit ?? DEFAULT_PAGINATION_ITEMS_LIMIT),
        sort_by,
      };

      const filter: IResourceFilter = {
        character_gender,
      };

      const [characters, error] = await CharacterService.getCharacters(
        filter,
        options
      );

      if (error) throw new ServerErrorException(error.message);

      return res
        .status(HTTP.OK)
        .json({
          data: { characters: characters.data, meta: characters.meta },
          message: "Chracters retrieved successfully",
        });
    },
  };
};
