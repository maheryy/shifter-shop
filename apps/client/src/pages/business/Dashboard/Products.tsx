import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/hooks/context";
import useProducts from "@/hooks/useProducts";

function Products() {
  const { user } = useAuthContext();

  const { data, isError, isLoading } = useProducts({
    sellerId: user?.id,
  });

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong...</p>;
  }

  const { products } = data;

  return (
    <section>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </section>
  );
}

export default Products;
