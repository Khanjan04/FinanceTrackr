// import { useSelector } from "react-redux";

// export default function Home() {
//   const title_heading = useSelector((state) => state.header.title);

//   return (
//     <>
//       {(() => {
//         switch (title_heading) {
//           case "dashboard":
//             return (
//               <div>
//                 <h3>Home</h3>
//               </div>
//             );
//         }
//       })()}
//     </>
//   );
// }




import React from "react";
import IncomeDashboard from "./Income";
import ExpenseDashboard from "./Expense";
import InvestmentDashboard from "./Investment";
import "./Dashboard.scss";
import ListHeading from "../../common/RDTListHeading/ListHeading";
import images from "../../../utils/images";

const Dashboard = () => {
  // const incomeData = [
  //   { amount: 5000, type: "Salary", description: "Monthly Salary" },
  //   { amount: 200, type: "Freelance", description: "Freelance Project" },
  // ];

  const expenseData = [
    { amount: 150, type: "Groceries", description: "Weekly Groceries" },
    { amount: 100, type: "Transport", description: "Monthly Public Transport" },
  ];

  const investmentData = [
    { amount: 1000, type: "Stocks", description: "Invested in Stock Market" },
    { amount: 500, type: "Bonds", description: "Government Bonds" },
  ];

  return (
    <div className="dashboard">
      {/* <h1>Enhanced Finance Dashboard</h1> */}
      <div className="dashboard_header d-flex flex-row justify-content-start align-items-center py-3">
        <img src={images.SystemUserHeadingIcon} width="26px" height="26px" />
        <div className="dashboard_subheader">Finance Dashboard</div>
      </div>
      <div className="components-container">
        {/* <IncomeDashboard data={incomeData} /> */}
        <ExpenseDashboard data={expenseData} />
        <InvestmentDashboard data={investmentData} />
      </div>
    </div>
  );
};

export default Dashboard;