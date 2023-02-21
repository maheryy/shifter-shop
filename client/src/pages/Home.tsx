import { useEffect, useState } from "react";
import { Product } from "../types/product";
import { getAllProducts } from "../api/product.api";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts()
      .then((products) => setProducts(products))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
