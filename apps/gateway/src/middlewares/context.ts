import { TRoute } from "@shifter-shop/dictionary";
import { NextFunction, Request, Response } from "express";

export const context =
  (ctx: TRoute) => (req: Request, res: Response, next: NextFunction) => {
    req.ctx = ctx;
    next();
  };
