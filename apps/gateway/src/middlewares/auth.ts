import { ServiceType, fetchJson } from "@shifter-shop/registry";
import { HttpError, UnauthorizedError } from "@shifter-shop/errors";
import { TUser } from "@shifter-shop/types";
import { NextFunction, Request, Response } from "express";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedError("Authorization header required");
    }

    const [type, token] = authorization.split(/\s+/);
    if (type !== "Bearer") {
      throw new UnauthorizedError("Bearer token required");
    }

    const user = await fetchJson<TUser>(
      { service: ServiceType.Auth, endpoint: "/verify-token" },
      { method: "POST", data: { token } }
    );

    req.headers["user-id"] = user.id;
    req.headers["user-role"] = user.role;
    next();
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.status).json(error.toJson());
    }
    return res.status(401).json({
      statusCode: 401,
      message: "Unexpected error while authenticating",
    });
  }
};
