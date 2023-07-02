import { TCart } from "@/types/cart";
import { UpdateLocalProductQuantity } from "@/types/cartProduct";
import StorageKey from "@/types/storage";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/storage";

export function getCart(): Promise<TCart> {
  const cart = getFromLocalStorage<TCart>(StorageKey.enum.cart);

  if (!cart) {
    const newCart: TCart = [];

    setToLocalStorage(StorageKey.enum.cart, newCart);

    return Promise.resolve(newCart);
  }

  return Promise.resolve(cart);
}

export async function updateProductQuantity({
  product,
  quantity,
}: UpdateLocalProductQuantity): Promise<TCart> {
  const cart = await getCart();

  if (quantity <= 0) {
    const newCart = cart.filter(
      (cartProduct) => cartProduct.product.id !== product.id,
    );

    setToLocalStorage(StorageKey.enum.cart, newCart);

    return Promise.resolve(newCart);
  }

  const isProductInCart = cart.some(
    (cartProduct) => cartProduct.product.id === product.id,
  );

  if (!isProductInCart) {
    const newCart = [
      ...cart,
      {
        product,
        quantity,
      },
    ];

    setToLocalStorage(StorageKey.enum.cart, newCart);

    return Promise.resolve(newCart);
  }

  const newCart = cart.map((cartProduct) => {
    if (cartProduct.product.id === product.id) {
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
