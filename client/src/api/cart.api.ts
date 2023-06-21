import { Cart, LocalCart } from "@/types/cart";
import { AddProductToCart, UpdateProductQuantity } from "@/types/cartProduct";
import { Product } from "@/types/product";
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
 * Adds a product to a cart.
 * @param cartId The id of the cart to add the product to.
 * @param payload The product to add to the cart.
 * @returns A promise that resolves to the updated cart.
 */
export function addProductToCart(payload: AddProductToCart): Promise<Cart> {
  return api.post(payload, `/cart/products`).json();
}

/**
 * Removes a product from a cart.
 * @param cartId The id of the cart to remove the product from.
 * @param productId The id of the product to remove from the cart.
 * @returns A promise that resolves to the updated cart.
 */
export function removeProductFromCart(productId: Product["id"]): Promise<Cart> {
  return api.delete(`/cart/products/${productId}`).json();
}

/**
 * Updates the quantity of a product in a cart.
 * @param cartId The id of the cart to update the product in.
 * @param productId The id of the product to update in the cart.
 * @param payload The new quantity of the product.
 *  @returns A promise that resolves to the updated cart.
 */
export function updateProductQuantity({
  productId,
  ...payload
}: UpdateProductQuantity): Promise<Cart> {
  return api.patch(payload, `/cart/products/${productId}`).json();
}

/**
 * Synchronizes a local cart with the server cart.
 * @param payload The local cart to synchronize.
 * @returns A promise that resolves to the updated cart.
 */
export function synchronizeCart(payload: LocalCart): Promise<Cart> {
  return api.post(payload, `/cart/synchronize`).json();
}

/**
 * Initiates the checkout process for a cart.
 * @param cartId The id of the cart to checkout.
 * @returns A promise that resolves to the updated cart.
 */
export function checkout(cartId: Cart["id"]): Promise<Cart> {
  return api.post(`/carts/${cartId}/checkout`).json();
}
