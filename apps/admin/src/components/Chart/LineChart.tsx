import { Line } from 'react-chartjs-2';

const LineChart = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const labels = [];
  for (let i = 6; i >= 0; i--) {
    const month = currentMonth - i;
    const year = currentYear - (month < 0 ? 1 : 0);
    const monthLabel = month < 0 ? month + 12 : month;
    labels.push(`${monthLabel + 1}/${year}`);
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Revenue",
        data: [150, 230, 190, 201, 165, 280, 250],
        fill: false,
        borderColor: "rgb(147, 51, 234)",
        tension: 0.3
      }
    ]
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Revenue between 2016-2020"
      },
      legend: {
        display: false
      }
    }
  }

  return (
    <div className="chart-container">
      <Line
        data={data}
        options={options}
      ></Line>
    </div>
  )
}

export default LineChart;