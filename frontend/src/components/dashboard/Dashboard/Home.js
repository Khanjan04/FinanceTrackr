import { Fade, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";
import IncomeDashboard from "./Income";
import ExpenseDashboard from "./Expense";
import InvestmentDashboard from "./Investment";
import "./Dashboard.scss";
import {
  delayTime,
  fadedelayTime,
  slideDirection,
} from "../../../utils/transitionEffectParams";
import images from "../../../utils/images";
import { expenseList } from "../../../api/expense";
import { investmentList } from "../../../api/investment";

const Dashboard = () => {
  const [slideChecked, setSlideChecked] = useState(false);
  const [expenseEntries, setExpenseEntries] = useState([]);
  const [investmentEntries, setInvestmentEntries] = useState([]);

  const [expenseData, setExpenseData] = useState([
    { amount: 0, type: "home" },
    { amount: 0, type: "travelling" },
    { amount: 0, type: "miscellaneous" },
    { amount: 0, type: "med_learning" },
    { amount: 0, type: "special" },
    { amount: 0, type: "shop_party" },
  ]);
  const [investmentData, setInvestmentData] = useState([
    { amount: 0, type: "stock" },
    { amount: 0, type: "mf" },
    { amount: 0, type: "nps" },
    { amount: 0, type: "fd" },
  ]);

  const getExpenseList = async () => {
    const { data, error } = await expenseList();
    if (data !== null) {
      setExpenseEntries(data.expense);
    }
  };

  const getInvestmentList = async () => {
    const { data, error } = await investmentList();
    if (data !== null) {
      setInvestmentEntries(data.investment);
    }
  };

  useEffect(() => {
    setSlideChecked(true);
  }, []);

  useEffect(() => {
    getExpenseList();
    getInvestmentList();
  }, [slideChecked]);

  useEffect(() => {
    let tempExpenseData = expenseData;
    expenseEntries.map((item) => {
      tempExpenseData.map((item2) => {
        if (item2.type == item.type) {
          item2.amount = item2.amount + item.amount
        }
      });
    });
    setExpenseData(tempExpenseData);
  }, [expenseEntries]);

  useEffect(() => {
    let tempInvestmentData = investmentData;
    investmentEntries.map((item) => {
      tempInvestmentData.map((item2) => {
        if (item2.type == item.type) {
          item2.amount = item2.amount + item.amount;
        }
      });
    });
    setInvestmentData(tempInvestmentData);
  }, [investmentEntries]);

  return (
    <>
      <Slide timeout={delayTime} direction={slideDirection} in={slideChecked}>
        <div>
          <Fade timeout={fadedelayTime} in={slideChecked}>
            <div className="dashboard">
              {/* <h1>Enhanced Finance Dashboard</h1> */}
              <div className="dashboard_header d-flex flex-row justify-content-start align-items-center py-3">
                <img
                  src={images.SystemUserHeadingIcon}
                  width="26px"
                  height="26px"
                />
                <div className="dashboard_subheader">Finance Dashboard</div>
              </div>
              <div className="components-container">
                <ExpenseDashboard data={expenseData} />
                <InvestmentDashboard data={investmentData} />
              </div>
            </div>
          </Fade>
        </div>
      </Slide>
    </>
  );
};

export default Dashboard;