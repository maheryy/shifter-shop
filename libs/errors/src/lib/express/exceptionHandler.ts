import { NextFunction, Request, Response } from "express";
import { HttpError } from "../exceptions/HttpError";
import { logger } from "@shifter-shop/logger";

export const exceptionHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof HttpError) {
    return res.status(error.status).json(error.toJson());
  }

  logger.error(`[Service Internal Error] ${error.message}`);
  return res.status(500).json({
    statusCode: 500,
    message: error.message || "An unexpected error occurred",
  });
};
