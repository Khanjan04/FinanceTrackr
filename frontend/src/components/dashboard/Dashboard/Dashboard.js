import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.scss";

function Dashboard() {
  return (
    <Container className="position-fixed px-0 w-100 h-100">
      <Row className="h-96">
        <Col className="side-bar px-0" lg={3} style={{ zIndex: 10 }}>
          <Sidebar />
        </Col>
        <Col className="h-100 main_area" lg={9} style={{ zIndex: 1 }}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;


// import React from "react";
// import IncomeDashboard from "./Income";
// import ExpenseDashboard from "./Expense";
// import InvestmentDashboard from "./Investment";
// import "./Dashboard.scss";

// const Dashboard = () => {
//   const incomeData = [
//     { amount: 5000, type: "Salary", description: "Monthly Salary" },
//     { amount: 200, type: "Freelance", description: "Freelance Project" },
//   ];

//   const expenseData = [
//     { amount: 150, type: "Groceries", description: "Weekly Groceries" },
//     { amount: 100, type: "Transport", description: "Monthly Public Transport" },
//   ];

//   const investmentData = [
//     { amount: 1000, type: "Stocks", description: "Invested in Stock Market" },
//     { amount: 500, type: "Bonds", description: "Government Bonds" },
//   ];

//   return (
//     <div className="dashboard">
//       <h1>Enhanced Finance Dashboard</h1>
//       <div className="components-container">
//         <IncomeDashboard data={incomeData} />
//         <ExpenseDashboard data={expenseData} />
//         <InvestmentDashboard data={investmentData} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
