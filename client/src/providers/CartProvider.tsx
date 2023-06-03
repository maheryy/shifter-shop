import { createContext, useEffect, useState } from "react";
import useComponentUpdate from "@/hooks/componentUpdate";
import { Product, ProductWithQuantity } from "@/types/product";
import { StorageKey } from "@/types/storage";
import { retrieve, store } from "@/utils/storage";

export const CartContext = createContext<CartContextProps>(null!);

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<ProductWithQuantity[]>([]);

  const addToCart = (product: Product, quantity = 1) => {
    const itemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (itemIndex === -1) {
      return setCartItems((items) => [...items, { ...product, quantity }]);
    }

    const cartItemsCopy = [...cartItems];

    cartItemsCopy[itemIndex].quantity += quantity;
    setCartItems(cartItemsCopy);
  };

  const removeFromCart = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  useEffect(() => {
    const items = retrieve<ProductWithQuantity[]>(StorageKey.CART);

    if (items) {
      setCartItems(items);
    }
  }, []);

  useComponentUpdate(
    () => store<ProductWithQuantity[]>(StorageKey.CART, cartItems),
    [cartItems],
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

interface CartContextProps {
  cartItems: ProductWithQuantity[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

interface CartProviderProps {
  children: React.ReactNode;
}

export default CartProvider;
