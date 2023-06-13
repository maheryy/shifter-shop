import { AddProductToCart, Cart, UpdateProductQuantity } from "@/types/cart";
import { Product } from "@/types/product";
import api from ".";

/**
 * Creates a new cart.
 * @returns A promise that resolves to the created cart.
 */
export function createCart(): Promise<Cart> {
  return api.post("/carts").json();
}

/**
 * Gets a cart by its id.
 * @param cartId The id of the cart to get.
 * @returns A promise that resolves to the cart.
 */
export function getCart(cartId: Cart["id"]): Promise<Cart> {
  return api.get(`/carts/${cartId}`).json();
}

/**
 * Adds a product to a cart.
 * @param cartId The id of the cart to add the product to.
 * @param payload The product to add to the cart.
 * @returns A promise that resolves to the updated cart.
 */
export function addProductToCart(
  cartId: Cart["id"],
  payload: AddProductToCart,
): Promise<Cart> {
  return api.post(payload, `/carts/${cartId}/products`).json();
}

/**
 * Removes a product from a cart.
 * @param cartId The id of the cart to remove the product from.
 * @param productId The id of the product to remove from the cart.
 * @returns A promise that resolves to the updated cart.
 */
export function removeFromCart(
  cartId: Cart["id"],
  productId: Product["id"],
): Promise<Cart> {
  return api.delete(`/carts/${cartId}/products/${productId}`).json();
}

/**
 * Updates the quantity of a product in a cart.
 * @param cartId The id of the cart to update the product in.
 * @param productId The id of the product to update in the cart.
 * @param payload The new quantity of the product.
 *  @returns A promise that resolves to the updated cart.
 */
export function updateProductQuantity(
  cartId: Cart["id"],
  productId: Product["id"],
  payload: UpdateProductQuantity,
): Promise<Cart> {
  return api.patch(payload, `/carts/${cartId}/products/${productId}`).json();
}

/**
 * Initiates the checkout process for a cart.
 * @param cartId The id of the cart to checkout.
 * @returns A promise that resolves to the updated cart.
 */
export function checkout(cartId: Cart["id"]): Promise<Cart> {
  return api.post(`/carts/${cartId}/checkout`).json();
}
