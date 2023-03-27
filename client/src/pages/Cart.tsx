import CartProductCard from "../components/cart/CartProductCard";
import { formatPrice } from "../utils/format";
import CartSummaryItem from "../components/cart/CartSummaryItem";
import { useMemo } from "react";
import { useCartContext } from "../hooks/context";
import { StripePayload } from "../types/stripe";

const Cart = () => {
  const {
    cartItems: products,
    removeFromCart: deleteProduct,
    updateQuantity,
  } = useCartContext();
  const totalPrice = useMemo(
    () =>
      products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      ),
    [products]
  );

  const order = async () => {
    try {
      const response = await fetch("http://localhost:3000/stripe/checkout", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to create order.");
      }

      const data = (await response.json()) as StripePayload;
      if (!data.url) {
        throw new Error("No redirect url returned from server.");
      }

      window.location.assign(data.url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container py-8 grid grid-cols-12 items-start gap-6">
      <div className="col-span-8 flex flex-col gap-2">
        {products.map((product) => (
          <CartProductCard
            key={product.id}
            product={product}
            updateQuantity={updateQuantity}
            deleteProduct={deleteProduct}
          />
        ))}
      </div>
      <div className="col-span-4 border border-gray-200 p-4 rounded">
        <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
          Order summary
        </h4>
        <div className="space-y-3">
          {products.map((product) => (
            <CartSummaryItem key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-between border-b border-gray-200 mt-3 text-gray-800 text-sm font-medium py-2 uppercas">
          <span>Subtotal</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 text-sm font-medium py-2 uppercas">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
          <span className="font-semibold">Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <button
          className="block w-full mt-2 py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
          onClick={order}
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
