import { NextFunction, Request, Response } from "express";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const userId = "HAHAHAHAH";
  if (!userId) {
    return res
      .status(401)
      .json({ error: { message: "Unauthorized", code: 401 } });
  }

  req.headers["user-id"] = userId;
  console.log("[middleware] auth fired");

  next();
};
