import { Route } from "@shifter-shop/registry";
import { NextFunction, Request, Response } from "express";

export const context =
  (ctx: Route) => (req: Request, res: Response, next: NextFunction) => {
    req.ctx = ctx;
    next();
  };
