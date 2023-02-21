import { useLoaderData } from "react-router-dom";
import { Product } from "../types/product";

const Home = () => {
  const products = useLoaderData() as Product[];

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
