import { useCallback, useEffect, useState } from 'react';
import { Line, ChartProps } from 'react-chartjs-2';
import { getConfirmedOrdersByMonths } from '@/api/order.api';

const LineChart = ({ month }: LineChartProps) => {
  const [dataset, setDataset] = useState<{ month: string; number: number }[]>([]);

  const fetchConfirmedOrdersByMonths = useCallback(() => {
    getConfirmedOrdersByMonths(month + 1)
      .then((orders) => {
        setDataset(orders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchConfirmedOrdersByMonths();
  }, []);

  const labels = dataset.map((order) => {
    const month = new Date(order.month).getMonth();
    const year = new Date(order.month).getFullYear();
    const monthLabel = month + 1;
    return `${monthLabel}/${year}`;
  });

  const dataValues = dataset.map((order) => order.number);

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        fill: false,
        borderColor: "rgb(147, 51, 234)",
        tension: 0.3
      }
    ]
  };

  const options: ChartProps<"line">['options'] = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        }
      },
      x: {
        reverse: true,
        ticks: {
          align: 'inner',
        },
      }
    },
    plugins: {
      title: {
        display: true,
      },
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

interface LineChartProps {
  month: number;
}

export default LineChart;