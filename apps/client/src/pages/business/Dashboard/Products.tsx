import useProducts from "@/hooks/useProducts";

function Products() {
  const { data, isError, isLoading } = useProducts();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong...</p>;
  }

  return (
    <section>
      <h1>Products</h1>
      <ul>
        {data?.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </section>
  );
}

export default Products;
