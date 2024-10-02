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
