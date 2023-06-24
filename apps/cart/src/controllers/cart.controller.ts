import { BadRequestError } from "@shifter-shop/errors";
import { NextFunction, Request, Response } from "express";
import {
  createOrUpdateItem,
  deleteProduct,
  getCustomerCart,
} from "services/cart.service";

// TODO: get customerId from request
const customerId = "4f701007-d8f0-4561-9105-cc3e5c188c85";

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await getCustomerCart(customerId);
    return res.status(200).json(items);
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
    const { productId } = req.params;
    const { quantity } = req.body as { quantity?: number };

    if (quantity === undefined) {
      throw new BadRequestError("Quantity is required");
    }

    if (quantity < 1) {
      await deleteProduct(customerId, productId);
      return res.status(204).end();
    }

    const order = await createOrUpdateItem(customerId, productId, quantity);
    console.log(order.identifiers);

    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};
