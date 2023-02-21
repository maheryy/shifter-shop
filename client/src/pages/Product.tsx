import { useParams, useLoaderData } from "react-router-dom";
import { Product } from "../types/product";

const Product = () => {
  const product = useLoaderData() as Product;

  return (
    <div>
      <h1>Product n°{product.id}</h1>
    </div>
  );
};

export default Product;
