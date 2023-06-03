import { NextFunction, Request, Response } from "express";

export const checkRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("[middleware] checkRoles fired");

  next();
};
