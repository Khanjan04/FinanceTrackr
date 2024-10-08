import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const InvestmentDashboard = ({ data }) => {
  const totalInvestment = data.reduce((acc, curr) => acc + curr.amount, 0);
  const chartData = {
    labels: data.map((item) => item.type),
    datasets: [
      {
        label: "Investment Amount",
        data: data.map((item) => item.amount),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <div className="investment-section">
      <h2 className="investment-heading">Investments</h2>
      <p>Total Investments: Rs {totalInvestment}</p>
      <Bar data={chartData} />
    </div>
  );
};

export default InvestmentDashboard;
