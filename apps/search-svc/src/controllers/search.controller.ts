import { NextFunction, Request, Response } from "express";
import { findAllProducts } from "services/search.service";

export const searchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await findAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
