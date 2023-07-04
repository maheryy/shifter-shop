import { getTopSalesProducts } from '@/api/order.api';
import { useEffect, useState } from 'react';
import { Bar, ChartProps } from 'react-chartjs-2';

const BarChart = ({ products }: { products: number }) => {
  const [dataset, setDataset] = useState<{ name: string, sales: number }[]>([]);

  useEffect(() => {
    getTopSalesProducts(products)
      .then((product) => {
        setDataset(product);
      })
      .catch((error) => {
        console.log(error);
      });
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
        label: "Users",
        data: dataValues,
        backgroundColor: "rgb(147, 51, 234, 0.4)",
        borderColor: "rgb(147, 51, 234)",
        borderWidth: 1,
      }
    ]
  };

  const options: ChartProps<"bar">['options'] = {
    plugins: {
      title: {
        display: true,
        text: "Users between 2016-2020"
      },
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

export default BarChart;