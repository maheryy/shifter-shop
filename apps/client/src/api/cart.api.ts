import { Cart } from "@/types/cart";
import { UpdateProductQuantity } from "@/types/cartProduct";
import api from ".";

/**
 * Gets a cart by its id.
 * @param cartId The id of the cart to get.
 * @returns A promise that resolves to the cart.
 */
export function getCart(): Promise<Cart> {
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
  payload: UpdateProductQuantity,
): Promise<Cart> {
  return api.post(payload, `/cart`).json();
}

/**
 * TODO
 * Synchronizes a local cart with the server cart.
 * @param payload The local cart to synchronize.
 * @returns A promise that resolves to the updated cart.
 */
export function synchronizeCart(payload: Cart): Promise<Cart> {
  return api.post(payload, `/cart/synchronize`).json();
}
