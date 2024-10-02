import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { changeTitle } from "../../../state/slices/header";
import "../../common/css/common.scss";
import "./Sidebar.scss";
import { ContactUsForm } from "./Contactusform";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);
  return <div onClick={decoratedOnClick}>{children}</div>;
}

function Sidebar() {
  const dispatch = useDispatch();
  const activeButton =
    "active-linkElement padding_sidebar sidebar-font text-decoration-none d-flex";
  const normalButton =
    "inactive-text-color padding_sidebar text-decoration-none sidebar-font d-flex";

  return (
    <div className="bs-white">
      <Accordion>
        <Card className="border-0 bg-transparent">
          <Card.Header className="p-0 border-0 bg-transparent">
            <CustomToggle eventKey="0">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? activeButton : normalButton
                }
                onClick={() => {
                  dispatch(changeTitle("dashboard"));
                }}
                end
              >
                <img
                  className="mx-3 filter-active"
                  src={require("./icons/dashboard.svg").default}
                  alt="dashboard-icon"
                  height="24px"
                  width="24px"
                  color="white"
                />
                Dashboard
              </NavLink>
            </CustomToggle>
          </Card.Header>
        </Card>
        <Card className="border-0 bg-transparent">
          <Card.Header className="p-0 border-0 bg-transparent">
            <CustomToggle eventKey="0">
              <NavLink
                to="/dashboard/income"
                className={({ isActive }) =>
                  isActive ? activeButton : normalButton
                }
                onClick={() => {
                  dispatch(changeTitle("income"));
                }}
                end
              >
                <img
                  className="mx-3 filter-active"
                  src={require("./icons/sys_user.svg").default}
                  alt="sysUser-icon"
                  height="24px"
                  width="24px"
                />
                Income
              </NavLink>
            </CustomToggle>
          </Card.Header>
        </Card>
        <Card className="border-0 bg-transparent">
          <Card.Header className="p-0 border-0 bg-transparent">
            <CustomToggle eventKey="0">
              <NavLink
                to="/dashboard/bank-account"
                className={({ isActive }) =>
                  isActive ? activeButton : normalButton
                }
                onClick={() => {
                  dispatch(changeTitle("bank_accounts"));
                }}
                end
              >
                <img
                  className="mx-3 filter-active"
                  src={require("./icons/dashboard.svg").default}
                  alt="sysUser-icon"
                  height="24px"
                  width="24px"
                />
                Bank Account
              </NavLink>
            </CustomToggle>
          </Card.Header>
        </Card>
        <Card className="border-0 bg-transparent">
          <Card.Header className="p-0 border-0 bg-transparent">
            <CustomToggle eventKey="0">
              <NavLink
                to="/dashboard/account-transaction"
                className={({ isActive }) =>
                  isActive ? activeButton : normalButton
                }
                onClick={() => {
                  dispatch(changeTitle("bank_accounts"));
                }}
                end
              >
                <img
                  className="mx-3 filter-active"
                  src={require("./icons/dashboard.svg").default}
                  alt="sysUser-icon"
                  height="24px"
                  width="24px"
                />
                Acc Transaction
              </NavLink>
            </CustomToggle>
          </Card.Header>
        </Card>
        <Card className="border-0 bg-transparent">
          <Card.Header className="p-0 border-0 bg-transparent">
            <CustomToggle eventKey="0">
              <NavLink
                to="/dashboard/expense"
                className={({ isActive }) =>
                  isActive ? activeButton : normalButton
                }
                onClick={() => {
                  dispatch(changeTitle("expense"));
                }}
                end
              >
                <img
                  className="mx-3 filter-active"
                  src={require("./icons/sys_user.svg").default}
                  alt="sysUser-icon"
                  height="24px"
                  width="24px"
                />
                Expense
              </NavLink>
            </CustomToggle>
          </Card.Header>
        </Card>
        <Card className="border-0 bg-transparent">
          <Card.Header className="p-0 border-0 bg-transparent">
            <CustomToggle eventKey="0">
              <NavLink
                to="/dashboard/investment"
                className={({ isActive }) =>
                  isActive ? activeButton : normalButton
                }
                onClick={() => {
                  dispatch(changeTitle("investment"));
                }}
                end
              >
                <img
                  className="mx-3 filter-active"
                  src={require("./icons/dashboard.svg").default}
                  alt="sysUser-icon"
                  height="24px"
                  width="24px"
                />
                Investments
              </NavLink>
            </CustomToggle>
          </Card.Header>
        </Card>
      </Accordion>
      <ContactUsForm />
    </div>
  );
}

export default Sidebar;
