import { LocalCart } from "@/types/cart";
import {
  AddProductToCart,
  CartProduct,
  UpdateProductQuantity,
} from "@/types/cartProduct";
import StorageKey from "@/types/storage";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/storage";

export function getCart() {
  const cart = getFromLocalStorage<LocalCart>(StorageKey.enum.cart);

  if (!cart) {
    const newCart: LocalCart = {
      products: [],
    };

    setToLocalStorage(StorageKey.enum.cart, newCart);

    return newCart;
  }

  return cart;
}

export function addProductToCart({ productToAdd, quantity }: AddProductToCart) {
  const cart = getCart();

  if (!cart) {
    throw new Error("Cart not found");
  }

  const isProductInCart = cart.products.some(
    ({ id }) => id === productToAdd.id,
  );

  if (isProductInCart) {
    const products = cart.products.map((product) => {
      if (product.id === productToAdd.id) {
        return {
          ...product,
          quantity: product.quantity + quantity,
        };
      }

      return product;
    });

    const newCart: LocalCart = {
      products: [...products],
    };

    setToLocalStorage(StorageKey.enum.cart, newCart);

    return Promise.resolve(newCart);
  }

  const newCart: LocalCart = {
    products: [...cart.products, { ...productToAdd, quantity }],
  };

  setToLocalStorage(StorageKey.enum.cart, newCart);

  return Promise.resolve(newCart);
}

export function removeProductFromCart(id: CartProduct["id"]) {
  const cart = getCart();

  if (!cart) {
    throw new Error("Cart not found");
  }

  const products = cart.products.filter((product) => product.id !== id);

  const newCart = {
    products: [...products],
  };

  setToLocalStorage(StorageKey.enum.cart, newCart);

  return Promise.resolve(newCart);
}

export function updateProductQuantity({ quantity }: UpdateProductQuantity) {
  const cart = getCart();

  if (!cart) {
    throw new Error("Cart not found");
  }

  const newCart = {
    products: cart.products.map((product) => ({
      ...product,
      quantity,
    })),
  };

  setToLocalStorage(StorageKey.enum.cart, newCart);

  return Promise.resolve(newCart);
}
