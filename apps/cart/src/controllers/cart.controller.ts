import { Request, Response } from "express";
import {
  createOrUpdateItem,
  deleteProduct,
  getCustomerCart,
} from "services/cart.service";

// TODO: get customerId from request
const customerId = "4f701007-d8f0-4561-9105-cc3e5c188c85";

export const getCart = async (req: Request, res: Response) => {
  try {
    const items = await getCustomerCart(customerId);
    return res.status(200).json(items);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: { message: (error as Error).message, code: 500 } });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { quantity } = req.body as { quantity?: number };

  try {
    if (quantity === undefined) {
      throw new Error("Quantity is required");
    }

    if (quantity < 1) {
      await deleteProduct(customerId, productId);
      return res.status(204).end();
    }

    const order = await createOrUpdateItem(customerId, productId, quantity);
    console.log(order.identifiers);

    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: { message: (error as Error).message, code: 400 } });
  }
};
