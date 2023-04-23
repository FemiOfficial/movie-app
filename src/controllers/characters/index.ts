import { CharacterRepository } from "../../repositories/character.repository";
import { CharacrerService } from "./character.service";
import { CharacterController } from "./character.controller";

export const createCharacterController = (characrerService: CharacrerService) => {
  return CharacterController(characrerService);
};

export const createCharacterService = (
  characterRepository: CharacterRepository,
) => {
  return new CharacrerService(characterRepository);
};
