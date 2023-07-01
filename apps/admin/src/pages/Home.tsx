import Card from "@/components/Card";
import ChartCard from "@/components/Chart/ChartCard";
import LineChart from "@/components/Chart/LineChart";
import BarChart from "@/components/Chart/BarChart";
import { CartIcon, ClientIcon, ProductIcon, CashIcon } from "@/components/Card/CardIcons";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement
} from "chart.js";

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale,
);

const Home = () => {
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
              value="638"
              icon={<ClientIcon />} />
            <Card
              title={`Total earned amount (${currentMonthName}. ${currentYear})`}
              value="$ 10,760.89"
              icon={<CashIcon />} />
            <Card
              title={`Sold products (${currentMonthName}. ${currentYear})`}
              value="37"
              icon={<ProductIcon />} />
            <Card
              title={`Orders placed (${currentMonthName}. ${currentYear})`}
              value="35"
              icon={<CartIcon />} />
          </div>
          {/* <!-- Charts --> */}
          <h2
            className="my-5 text-2xl font-semibold text-gray-700 dark:text-gray-200"
          >
            Charts
          </h2>
          <div className="grid gap-6 mb-8 md:grid-cols-2">
            <ChartCard title="Confirmed Orders (last 6 months)">
              <LineChart />
            </ChartCard>
            <ChartCard title={`Top sales (${currentMonthName}. ${currentYear})`}>
              <BarChart />
            </ChartCard>
          </div>
        </div>
      </main>
    </div>
  </>;
};

export default Home;