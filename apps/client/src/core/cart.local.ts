import { Cart } from "@/types/cart";
import { UpdateProductQuantity } from "@/types/cartProduct";
import StorageKey from "@/types/storage";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/storage";

export function getCart(): Promise<Cart> {
  const cart = getFromLocalStorage<Cart>(StorageKey.enum.cart);

  if (!cart) {
    const newCart: Cart = [];

    setToLocalStorage(StorageKey.enum.cart, newCart);

    return Promise.resolve(newCart);
  }

  return Promise.resolve(cart);
}

export async function updateProductQuantity({
  productId,
  quantity,
}: UpdateProductQuantity): Promise<Cart> {
  const cart = await getCart();

  if (!cart) {
    throw new Error("Cart not found");
  }

  if (quantity <= 0) {
    const newCart = cart.filter(({ product }) => product.id !== productId);

    setToLocalStorage(StorageKey.enum.cart, newCart);

    return Promise.resolve(newCart);
  }

  const newCart = cart.map((cartProduct) => {
    const { product } = cartProduct;

    if (product.id === productId) {
      return {
        ...cartProduct,
        quantity,
      };
    }

    return cartProduct;
  });

  setToLocalStorage(StorageKey.enum.cart, newCart);

  return Promise.resolve(newCart);
}
