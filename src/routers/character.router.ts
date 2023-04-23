import express from "express";

import type { ICharactersController } from "../types/common.types";

export const createCharacterRouter = (
  controller: ICharactersController
) => {
  const router = express.Router();

  router.get("/characters", controller.getCharacters);
  return router;
};
