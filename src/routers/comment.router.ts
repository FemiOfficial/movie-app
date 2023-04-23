import express from "express";

import type { ICommentController } from "../types/common.types";
import { retrieveRequestIp } from "../middlewares/request";
import { AddCommentValidatorSchema, GetCommentValidatorSchema } from "../controllers/comments/ comments.middlewares";

export const createCommentRouter = (
  controller: ICommentController
) => {
  const router = express.Router();

  router.get("/comment", GetCommentValidatorSchema, controller.getComments);
  router.post("/comment", AddCommentValidatorSchema, retrieveRequestIp, controller.addComment);
  return router;
};
