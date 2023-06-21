import { Link } from "react-router-dom";
import OrderCard from "@/components/account/OrderCard";
import useOrders from "@/hooks/useOrders";
import DownloadProvider from "@/providers/DownloadProvider";

const Orders = () => {
  const { data, isLoading, isError } = useOrders();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <DownloadProvider>
      <section className="grid gap-8">
        <Link className="md:hidden" to="/account">
          &lt; Back
        </Link>
        {data.map((order) => (
          <OrderCard key={order.reference} order={order} />
        ))}
      </section>
    </DownloadProvider>
  );
};

export default Orders;
