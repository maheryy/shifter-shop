import { BadRequestError, UnauthorizedError } from "@shifter-shop/errors";
import { NextFunction, Request, Response } from "express";
import {
  createOrUpdateItem,
  deleteProduct,
  getCustomerCart,
} from "services/cart.service";

import { joinResources } from "@shifter-shop/helpers";
import { TCartItem, TFullCartItem } from "@shifter-shop/dictionary";

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = req.get("user-id");
    if (!customerId) {
      throw new UnauthorizedError();
    }

    const items = await getCustomerCart(customerId);
    const results = await joinResources<TFullCartItem, TCartItem>(items, [
      { service: "user", key: "customerId", addKey: "customer" },
      { service: "product", key: "productId", addKey: "product" },
    ]);

    return res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = req.get("user-id");
    if (!customerId) {
      throw new UnauthorizedError();
    }
    const { quantity, productId } = req.body as {
      quantity?: number;
      productId?: string;
    };

    if (productId === undefined) {
      throw new BadRequestError("Product ID is required");
    }

    if (quantity === undefined) {
      throw new BadRequestError("Quantity is required");
    }

    if (quantity < 1) {
      await deleteProduct(customerId, productId);
      return res.status(204).end();
    }

    await createOrUpdateItem(customerId, productId, quantity);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};
