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
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
      },
    ],
  };

  return (
    <div className="expense-section">
      <h2>Expenses</h2>
      <p>Total Expenses: ${totalExpense}</p>
      <p>
        Largest Expense: {largestExpense.type} - ${largestExpense.amount}
      </p>
      <Pie data={chartData} />
    </div>
  );
};

export default ExpenseDashboard;
