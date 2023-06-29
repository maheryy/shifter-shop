import EmptyCart from "@illustrations/empty-cart.svg";
import { Link, useNavigate } from "react-router-dom";
import CartProductCard from "@/components/cart/CartProductCard";
import CartSummaryItem from "@/components/cart/CartSummaryItem";
import useCart from "@/hooks/useCart";
import { formatPrice } from "@/utils/format";
import isEmpty from "@/utils/isEmpty";

function Cart() {
  const navigate = useNavigate();
  const { cartQuery } = useCart();
  const { data, isError, isLoading } = cartQuery;

  if (isLoading) {
    return (
      <section className="container grid justify-items-center gap-8 py-8">
        <p className="text-lg">Loading...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="container grid justify-items-center gap-8 py-8">
        <p className="text-lg">Something went wrong...</p>
      </section>
    );
  }

  if (isEmpty(data)) {
    return (
      <section className="container grid justify-items-center gap-8 py-8">
        <EmptyCart className="h-full w-full md:h-96 md:w-96" />
        <p className="text-lg">
          Your cart is empty, what about taking a look
          <Link
            className="text-primary underline-offset-2 hover:underline"
            to="/products"
          >
            {" "}
            over here ?
          </Link>
        </p>
      </section>
    );
  }

  const price = data.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0,
  );

  const formattedPrice = formatPrice(price);

  function onCheckout() {
    navigate("/checkout");
  }

  return (
    <section className="container grid items-start gap-4 py-8 lg:grid-cols-12">
      <div className="grid gap-2 lg:col-span-8">
        {data.map((cartProduct) => (
          <CartProductCard
            cartProduct={cartProduct}
            key={cartProduct.product.id}
          />
        ))}
      </div>
      <div className="grid gap-4 rounded border border-gray-200 p-4 lg:col-span-4">
        <h4 className="text-lg font-medium uppercase text-gray-800">
          Order summary
        </h4>
        <div className="">
          {data.map((cartProduct) => (
            <CartSummaryItem
              cartProduct={cartProduct}
              key={cartProduct.product.id}
            />
          ))}
        </div>
        <div className="flex justify-between border-b border-gray-200 py-2 text-sm font-medium uppercase text-gray-800">
          <span>Subtotal</span>
          <span>{formattedPrice}</span>
        </div>
        <div className="flex justify-between border-b border-gray-200 py-2 text-sm font-medium uppercase text-gray-800">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between py-4 font-medium uppercase text-gray-800">
          <span className="font-semibold">Total</span>
          <span>{formattedPrice}</span>
        </div>
        <button
          className="block w-full rounded-md border border-primary bg-primary px-4 py-2 text-center font-medium text-white transition hover:bg-transparent hover:text-primary"
          onClick={onCheckout}
        >
          Go to checkout
        </button>
      </div>
    </section>
  );
}

export default Cart;
