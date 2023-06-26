import { NextFunction, Request, Response } from "express";
import { HttpError } from "../exceptions/HttpError";

export const exceptionHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof HttpError) {
    return res.status(error.status).json(error.toJson());
  }

  console.error(`\x1b[31m[Service Internal Error] ${error.message}\x1b[0m`);
  return res.status(500).json({
    statusCode: 500,
    message: error.message || "An unexpected error occurred",
  });
};
