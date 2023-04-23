import { Request, Response, NextFunction } from "express";
import { ValidationError } from "express-validation";
export class StatusError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super();
    this.message = message;
    this.status = status;
  }
}



export const BadRequestHandler = (
  err: StatusError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //do not show stack traces for errors in CI environment
  !process.env.IN_CI && console.error(err.stack);

  if (err instanceof ValidationError) {
    return res.status(err.status || 400).json({ error: err?.details ?? err.message, data: null});
  } else {
    return res.status(err.status || 400).json({ error: err.message, data: null});
  }
};



export const serverErrorHandler = (
  err: StatusError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //do not show stack traces for errors in CI environment
  !process.env.IN_CI && console.error(err.stack);

  return res.status(err.status || 500).json({ error: err.message, data: null})
};
