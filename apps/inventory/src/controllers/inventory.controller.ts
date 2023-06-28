import { BadRequestError } from "@shifter-shop/errors";
import { NextFunction, Request, Response } from "express";

export const newItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      throw new BadRequestError("productId is required");
    }

    return res.status(200).json([]);
  } catch (error) {
    next(error);
  }
};

export const getRemainingQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      throw new BadRequestError("productId is required");
    }

    return res.status(200).json([]);
  } catch (error) {
    next(error);
  }
};

export const pullItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!productId) {
      throw new BadRequestError("productId is required");
    }
    if (!quantity) {
      throw new BadRequestError("quantity is required");
    }

    return res.status(200).json([]);
  } catch (error) {
    next(error);
  }
};

export const restock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!productId) {
      throw new BadRequestError("productId is required");
    }
    if (!quantity) {
      throw new BadRequestError("quantity is required");
    }

    return res.status(200).json([]);
  } catch (error) {
    next(error);
  }
};
