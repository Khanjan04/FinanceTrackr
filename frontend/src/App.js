import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import BankAccount from "./components/dashboard/BankAccount/BankAccount";
import Dashboard from "./components/dashboard/Dashboard/Dashboard";
import Home from "./components/dashboard/Dashboard/Home";
import Header from "./components/layouts/Header/Header"
import Income from "./components/dashboard/Income/Income";
import Expense from "./components/dashboard/Expense/Expense";
import Investment from "./components/dashboard/Investment/Investment";
import AccountTransaction from "./components/dashboard/AccountTransaction/AccountTransaction";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />} />
          <Route path="bank-account" element={<BankAccount />} />
          <Route path="account-transaction" element={<AccountTransaction />} />
          <Route path="income" element={<Income />} />
          <Route path="expense" element={<Expense />} />
          <Route path="investment" element={<Investment />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
