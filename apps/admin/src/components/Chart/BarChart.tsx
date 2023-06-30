import { Bar } from 'react-chartjs-2';

const BarChart = () => {

  const data = {
    labels: ["Casque", "Moteur", "Shifter pro", "Roue", "Gloves"],
    datasets: [
      {
        label: "Users",
        data: [10, 6, 20, 8, 16],
        backgroundColor: "rgb(147, 51, 234, 0.4)",
        borderColor: "rgb(147, 51, 234)",
        borderWidth: 1,
      }
    ]
  };

  const options = {
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
      <Bar
        data={data}
        options={options}
      ></Bar>
    </div>
  )
}

export default BarChart;