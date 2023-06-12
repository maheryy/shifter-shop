import EmptyCart from "@illustrations/empty-cart.svg";
import { Fragment, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "@/api/order.api";
import CartProductCard from "@/components/cart/CartProductCard";
import CartSummaryItem from "@/components/cart/CartSummaryItem";
import { useCartContext } from "@/hooks/context";
import { formatPrice } from "@/utils/format";

const Cart = () => {
  const navigate = useNavigate();

  const {
    cartItems: products,
    removeFromCart: deleteProduct,
    updateQuantity,
  } = useCartContext();

  const isEmpty = products.length === 0;

  const totalPrice = useMemo(
    () =>
      products.reduce((acc, { price, quantity }) => acc + price * quantity, 0),
    [products],
  );

  function onOrder() {
    createOrder({});

    navigate("/order");
  }

  return (
    <Fragment>
      {isEmpty ? (
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
      ) : (
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
              onClick={onOrder}
            >
              Order
            </button>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default Cart;
