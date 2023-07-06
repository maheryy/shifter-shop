import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "@shifter-shop/errors";
import { NextFunction, Request, Response } from "express";
import * as cartService from "services/cart.service";
import { fetchJson, joinResources } from "@shifter-shop/helpers";
import {
  EService,
  TCartItem,
  TFullCartItem,
  TProduct,
} from "@shifter-shop/dictionary";
import { SyncCart, TSyncCart } from "../validation/SyncCart";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

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

    const items = await cartService.getCustomerCart(customerId);

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

    await fetchJson<TProduct>({
      service: EService.Product,
      endpoint: `/${productId}`,
    });

    if (quantity < 1) {
      await cartService.deleteProduct(customerId, productId);

      const items = await cartService.getCustomerCart(customerId);

      const results = await joinResources<TFullCartItem, TCartItem>(items, [
        { service: "user", key: "customerId", addKey: "customer" },
        { service: "product", key: "productId", addKey: "product" },
      ]);

      return res.status(200).json(results);
    }

    await cartService.createOrUpdateItem(customerId, productId, quantity);

    const items = await cartService.getCustomerCart(customerId);

    const results = await joinResources<TFullCartItem, TCartItem>(items, [
      { service: "user", key: "customerId", addKey: "customer" },
      { service: "product", key: "productId", addKey: "product" },
    ]);

    return res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

export async function syncCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const customerId = req.get("user-id");

    if (!customerId) {
      throw new UnauthorizedError();
    }

    await SyncCart.strict().parse(req.body);

    const cart = await cartService.syncCart(customerId, req.body);

    return res.status(200).json(cart);
  } catch (error) {
    if (error instanceof ZodError) {
      return next(new BadRequestError("Your cart is malformed"));
    }

    next(error);
  }
}
