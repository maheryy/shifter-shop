import Card from "@/components/Card";
import ChartCard from "@/components/Chart/ChartCard";
import LineChart from "@/components/Chart/LineChart";
import BarChart from "@/components/Chart/BarChart";
import { EOrderStatus } from "@shifter-shop/dictionary";
import { CartIcon, ClientIcon, ProductIcon, CashIcon } from "@/components/Card/CardIcons";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement
} from "chart.js";
import { useCallback, useEffect, useState } from "react";
import { getCountCustomers } from "@/api/user.api";
import { getConfirmedOrdersByMonths } from "@/api/order.api";
import { getTotalAmount } from "@/api/order.api";
import { getTotalSoldProducts } from "@/api/order.api";

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale,
);

const Home = () => {
  const [nbClients, setNbClients] = useState(0);
  const [nbProducts, setNbProducts] = useState(0);
  const [nbOrders, setNbOrders] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const monthsLineChart = 6;
  const monthsBarChart = 3;
  const nbProductsBarChart = 3;

  const fetchCountCustomers = useCallback(() => {
    getCountCustomers()
      .then((count) => {
        setNbClients(count);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchCountOrdersActualMonth = useCallback(() => {
    getConfirmedOrdersByMonths(1)
      .then((orders) => {
        const count = orders[0].number;
        setNbOrders(count);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchTotalAmount = useCallback(() => {
    getTotalAmount()
      .then((total) => {
        setTotalEarned(total);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchTotalSoldProducts = useCallback(() => {
    getTotalSoldProducts()
      .then((count) => {
        setNbProducts(count);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchCountCustomers();
    fetchCountOrdersActualMonth();
    fetchTotalAmount();
    fetchTotalSoldProducts();
  }, [fetchCountCustomers, fetchCountOrdersActualMonth, fetchTotalAmount, fetchTotalSoldProducts]);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const currentMonthName = monthNames[currentMonth];

  return <>
    <div className="flex flex-col flex-1 w-full">
      <main className="h-full overflow-y-auto">
        <div className="container px-6 mx-auto grid">
          <h2
            className="my-5 text-2xl font-semibold text-gray-700 dark:text-gray-200"
          >
            Dashboard
          </h2>
          {/* <!-- Cards --> */}
          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            <Card
              title="Total clients"
              value={nbClients.toString()}
              icon={<ClientIcon />} />
            <Card
              title={`Total earned amount (${currentMonthName}. ${currentYear})`}
              value={`$ ${totalEarned.toFixed(2).toString().toLocaleString()}`}
              icon={<CashIcon />} />
            <Card
              title={`Sold products (${currentMonthName}. ${currentYear})`}
              value={nbProducts.toString()}
              icon={<ProductIcon />} />
            <Card
              title={`Orders placed (${currentMonthName}. ${currentYear})`}
              value={nbOrders.toString()}
              icon={<CartIcon />} />
          </div>
          {/* <!-- Charts --> */}
          <h2
            className="my-5 text-2xl font-semibold text-gray-700 dark:text-gray-200"
          >
            Charts
          </h2>
          <div className="grid gap-6 mb-8 md:grid-cols-1 xl:grid-cols-2">
            <ChartCard title={`Confirmed Orders (last ${monthsLineChart} months)`}>
              <LineChart months={monthsLineChart} />
            </ChartCard>
            <ChartCard title={`Top ${nbProductsBarChart} sales (from last ${monthsBarChart} months - ${currentMonthName}. ${currentYear} included)`}>
              <BarChart products={nbProductsBarChart} months={monthsBarChart} />
            </ChartCard>
          </div>
        </div>
      </main>
    </div>
  </>;
};

export default Home;