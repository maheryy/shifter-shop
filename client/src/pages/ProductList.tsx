import { useLoaderData } from "react-router-dom";
import { Product } from "../types/product";

const ProductList = () => {
  const products = useLoaderData() as Product[];
  
  return (
    <div>
      <h1>Product List</h1>
    </div>
  );
};

export default ProductList;
