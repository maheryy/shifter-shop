import { getTopSalesProducts } from '@/api/order.api';
import { useCallback, useEffect, useState } from 'react';
import { Bar, ChartProps } from 'react-chartjs-2';

const BarChart = ({ products, month }: BarChartProps) => {
  const [dataset, setDataset] = useState<{ name: string, sales: number }[]>([]);

  const fetchTopSalesProducts = useCallback(() => {
    getTopSalesProducts(products, month)
      .then((orders) => {
        setDataset(orders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchTopSalesProducts();
  }, []);

  const labels = dataset.map((order) => {
    const name = order.name;
    return `${name}`;
  });

  const dataValues = dataset.map((order) => order.sales);

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: "rgb(147, 51, 234, 0.4)",
        borderColor: "rgb(147, 51, 234)",
        borderWidth: 1,
      }
    ]
  };

  const options: ChartProps<"bar">['options'] = {
    plugins: {
      legend: {
        display: false
      }
    }
  }

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  )
}

interface BarChartProps {
  products: number;
  month: number;
}

export default BarChart;