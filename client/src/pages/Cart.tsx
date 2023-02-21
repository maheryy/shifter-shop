import { useLoaderData } from "react-router-dom";
import { Product } from "../types/product";

const Cart = () => {
  const products = useLoaderData() as Product[];

  return (
    <div>
      <h1>Cart</h1>
    </div>
  );
};

export default Cart;
