import { TCart } from "@/types/cart";
import { UpdateLocalProductQuantity } from "@/types/cartProduct";
import api from ".";

/**
 * Gets a cart by its id.
 * @param cartId The id of the cart to get.
 * @returns A promise that resolves to the cart.
 */
export function getCart(): Promise<TCart> {
  return api.get("/cart").json();
}

/**
 * Updates the quantity of a product in a cart.
 * @param cartId The id of the cart to update the product in.
 * @param productId The id of the product to update in the cart.
 * @param payload The new quantity of the product.
 *  @returns A promise that resolves to the updated cart.
 */
export function updateProductQuantity(
  payload: UpdateLocalProductQuantity,
): Promise<TCart> {
  const { product, quantity } = payload;
  const { id: productId } = product;

  return api.post({ productId, quantity }, `/cart`).json();
}

/**
 * TODO
 * Synchronizes a local cart with the server cart.
 * @param payload The local cart to synchronize.
 * @returns A promise that resolves to the updated cart.
 */
export function synchronizeCart(payload: TCart): Promise<TCart> {
  return api.post(payload, `/cart/synchronize`).json();
}
