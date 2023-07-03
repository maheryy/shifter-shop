import { fetchJson } from "@shifter-shop/helpers";
import db from "../database";
import { CartItem } from "entities/cart.entity";
import { TSyncCart } from "validation/SyncCart";
import { TProduct } from "@shifter-shop/dictionary";

export const getCustomerCart = async (customerId: string) => {
  return CartItem.find({
    where: { customerId },
  });
};

export const createOrUpdateItem = async (
  customerId: string,
  productId: string,
  quantity: number
) => {
  return CartItem.upsert(
    { customerId, productId, quantity },
    { conflictPaths: ["customerId", "productId"] }
  );
};

export async function syncCart(
  customerId: string,
  { cart }: TSyncCart
): Promise<CartItem[]> {
  const cartItems = await getCustomerCart(customerId);

  if (cartItems.length === 0) {
    await CartItem.insert(
      cart.map((cartItem) => ({ ...cartItem, customerId }))
    );

    return getCustomerCart(customerId);
  }

  await Promise.all(
    cart.map(({ productId }) =>
      fetchJson<TProduct>({ service: "product", endpoint: `/${productId}` })
    )
  );

  const cartItemsMap = [...cartItems, ...cart].reduce<{ [k: string]: number }>(
    (accumulator, { productId, quantity }) => {
      if (accumulator[productId]) {
        return {
          ...accumulator,
          [productId]: accumulator[productId] + quantity,
        };
      }

      return {
        ...accumulator,
        [productId]: quantity,
      };
    },
    {}
  );

  const newCartItems = Object.entries(cartItemsMap).map(
    ([productId, quantity]) => ({
      customerId,
      productId,
      quantity,
    })
  );

  await CartItem.upsert(newCartItems, {
    conflictPaths: ["customerId", "productId"],
  });

  return getCustomerCart(customerId);
}

export const deleteProduct = async (customerId: string, productId: string) => {
  return CartItem.delete({ customerId, productId });
};

export const clearCart = async (customerId: string) => {
  return CartItem.delete({ customerId });
};
