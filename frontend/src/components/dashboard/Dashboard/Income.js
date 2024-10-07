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

const IncomeDashboard = ({ data }) => {
  const totalIncome = data.reduce((acc, curr) => acc + curr.amount, 0);
  const highestIncomeSource = data.reduce((prev, curr) =>
    prev.amount > curr.amount ? prev : curr
  );

  // Data for the Bar chart
  const chartData = {
    labels: data.map((item) => item.type),
    datasets: [
      {
        label: "Income Amount",
        data: data.map((item) => item.amount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="income-section">
      <h2>Income</h2>
      <p>Total Income: ${totalIncome}</p>
      <p>
        Highest Income Source: {highestIncomeSource.type} - $
        {highestIncomeSource.amount}
      </p>
      <Bar data={chartData} />
    </div>
  );
};

export default IncomeDashboard;
