import { useMemo } from "react";
import CartProductCard from "@/components/cart/CartProductCard";
import CartSummaryItem from "@/components/cart/CartSummaryItem";
import { useCartContext } from "@/hooks/context";
import { StripePayload } from "@/types/stripe";
import { formatPrice } from "@/utils/format";

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
        0,
      ),
    [products],
  );

  const order = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/stripe/checkout`,
        {
          method: "POST",
        },
      );

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
    <section className="container grid items-start gap-4 py-8 lg:grid-cols-12">
      <div className="grid gap-2 lg:col-span-8">
        {products.map((product) => (
          <CartProductCard
            deleteProduct={deleteProduct}
            key={product.id}
            product={product}
            updateQuantity={updateQuantity}
          />
        ))}
      </div>
      <div className="grid gap-4 rounded border border-gray-200 p-4 lg:col-span-4">
        <h4 className="text-lg font-medium uppercase text-gray-800">
          Order summary
        </h4>
        <div className="">
          {products.map((product) => (
            <CartSummaryItem key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-between border-b border-gray-200 py-2 text-sm font-medium uppercase text-gray-800">
          <span>Subtotal</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between border-b border-gray-200 py-2 text-sm font-medium uppercase text-gray-800">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between py-4 font-medium uppercase text-gray-800">
          <span className="font-semibold">Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <button
          className="block w-full rounded-md border border-primary bg-primary px-4 py-2 text-center font-medium text-white transition hover:bg-transparent hover:text-primary"
          onClick={order}
        >
          Order
        </button>
      </div>
    </section>
  );
};

export default Cart;
