import { HttpError, InternalServerError } from "@shifter-shop/errors";
import { NextFunction, Request, Response } from "express";

export const roles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ctx } = req;

    if (!ctx) {
      throw new InternalServerError("[Roles] Route context not found");
    }
    if (!ctx.roles || !Array.isArray(ctx.roles) || ctx.roles.length === 0) {
      throw new InternalServerError(
        `[Roles] Undefined roles for this route : ${ctx.method} ${ctx.path}`
      );
    }

    const role = req.headers["user-role"] as string;
    if (!ctx.roles.includes(role)) {
      throw new HttpError(403, "Forbidden");
    }

    next();
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.status).json(error.toJson());
    }

    return res.status(500).json({
      statusCode: 500,
      message: "Unexpected error while checking roles",
    });
  }
};
