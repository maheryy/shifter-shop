import useOrders from "@/hooks/useOrders";

function Orders() {
  const { data, isError, isLoading } = useOrders();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong...</p>;
  }

  return (
    <section>
      <h1>Orders</h1>
      <ul>
        {data?.map((order) => (
          <li key={order.id}>{order.reference}</li>
        ))}
      </ul>
    </section>
  );
}

export default Orders;
