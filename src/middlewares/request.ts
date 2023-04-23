import { NextFunction, Response, Request } from "express";
import { getIp } from "../utils/helper.util";

export const retrieveRequestIp = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  request.body.ip = getIp(request);
  next();
};
