import { Request, Response } from "express";
import { HttpError } from "../exceptions/HttpError";

export const exceptionHandler = (error: Error, req: Request, res: Response) => {
  console.error(error.message);
  
  if (error instanceof HttpError) {
    return res.status(error.status).json(error.toJson());
  }

  return res.status(500).json({
    status: 500,
    message: error.message || "An unexpected error occurred",
  });
};
