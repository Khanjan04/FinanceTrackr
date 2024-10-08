import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseDashboard = ({ data }) => {
  const totalExpense = data.reduce((acc, curr) => acc + curr.amount, 0);
  const largestExpense = data.reduce((prev, curr) =>
    prev.amount > curr.amount ? prev : curr
  );

  // Data for the Pie chart
  const chartData = {
    labels: data.map((item) => item.type),
    datasets: [
      {
        label: "Expense Amount",
        data: data.map((item) => item.amount),
        backgroundColor: [
          "rgba(55, 99, 132, 150.6)",
          "rgba(14, 142, 235, 90.6)",
          "rgba(194, 162, 235, 70.6)",
          "rgba(04, 62, 235, 50.6)",
          "rgba(54, 202, 235, 30.6)",
          "rgba(54, 142, 235, 10.6)",
        ],
      },
    ],
  };

  return (
    <div className="expense-section">
      <h2 className="expense-heading">Expenses</h2>
      <p>Total Expenses: Rs {totalExpense}</p>
      <p>
        Largest Expense: {largestExpense.type} - Rs {largestExpense.amount}
      </p>
      <Pie data={chartData} />
    </div>
  );
};

export default ExpenseDashboard;
