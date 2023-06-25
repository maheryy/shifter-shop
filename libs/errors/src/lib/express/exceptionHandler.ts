import { Request, Response } from "express";
import { HttpError } from "../exceptions/HttpError";

export const exceptionHandler = (error: Error, req: Request, res: Response) => {
  // Route not found case (res taken as NextFunction)
  if (typeof res === "function") {
    const { url, method } = error as unknown as Request;
    return (req as unknown as Response).status(404).json({
      statusCode: 404,
      message: `Cannot ${method} ${url}`,
    });
  }

  if (error instanceof HttpError) {
    return res.status(error.status).json(error.toJson());
  }

  console.error(`\x1b[31m[Service Internal Error] ${error.message}[0m`);
  return res.status(500).json({
    statusCode: 500,
    message: error.message || "An unexpected error occurred",
  });
};
