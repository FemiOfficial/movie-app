import { CharacterRepository } from "../../repositories/character.repository";
import { CharacterService } from "./character.service";
import { CharacterController } from "./character.controller";

export const createCharacterController = (CharacterService: CharacterService) => {
  return CharacterController(CharacterService);
};

export const createCharacterService = (
  characterRepository: CharacterRepository,
) => {
  return new CharacterService(characterRepository);
};
