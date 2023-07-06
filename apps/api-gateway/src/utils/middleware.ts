import { RequestHandler } from "express";
import * as MiddlewareService from "middlewares";

type Middleware = keyof typeof MiddlewareService;

export const registerMiddlewares = (
  middlewares: string[]
): RequestHandler[] => {
  return middlewares.map((m) => {
    const fn = MiddlewareService[m as Middleware];
    if (fn === undefined) {
      throw new Error(`Middleware ${m} not found`);
    }
    return fn;
  });
};
