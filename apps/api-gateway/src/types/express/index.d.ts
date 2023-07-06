import { TRoute } from "@shifter-shop/registry";

declare global {
  declare namespace Express {
    export interface Request {
      ctx: TRoute;
    }
  }
}
