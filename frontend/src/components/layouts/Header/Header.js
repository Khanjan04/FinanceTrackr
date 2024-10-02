import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  Row,
  Offcanvas,
} from "react-bootstrap";
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { get_jwt_token, loginRedirect } from "../../../api/helper_funtions";
import { changeTitle } from "../../../state/slices/header";
import { clearErrors } from "../../../state/slices/user";
import useWindowDimensions from "../../../utils/getHeightWidth";
import { showError } from "../../../utils/showMessage";
import "./Header.scss";
import Profile from "./Profile";
// import { getbrandingLogo } from "../../../api/branding";
import { useNavigate } from "react-router-dom";
// import GetCapabilities from "../../../utils/getCapabilities";
// import AdminNotificationIcon from "../../dashboard/Ticketing/AdminNotification";
// import EndUserNotificationIcon from "../../dashboard/Ticketing/EndUserNotification";

function Header(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let isAuditDashboard;
  if(window.location.pathname.split('/')[1]=='dashboard'){
   isAuditDashboard=false
  }
  else {
    isAuditDashboard=true
  }
  const [CustomUIs, setCustomUIs] = useState([]);
  const serverURL = useSelector((state) => state.customer.serverUrl);
  const getCustomUIs = async () => {
    const token = get_jwt_token();
    loginRedirect(token);
    // const response = await getbrandingLogo();
    // setCustomUIs([response.data]);
  };
  // const my_capabilities=GetCapabilities();
  // const isCapable =my_capabilities[0];
  // const isCapableEnduser =my_capabilities[1];
  const { error } = useSelector((state) => state.user);
  useEffect(() => {
    // getCustomUIs();
    if (error) {
      showError(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  const { width } = useWindowDimensions();
  let expand = "md";

  return (
    <div className="header">
      <h1>
        <b>Header</b>
      </h1>
    </div>
    // <Row className="container-fluid position-relative" style={{ zIndex: 10 }}>
    //   <Col
    //     lg={{ span: 2, offset: 0 }}
    //     md={{ span: 3, offset: 0 }}
    //     className={
    //       width >= 768
    //         ? "position-fixed px-0 py-0 border-bottom"
    //         : "position-absolute px-0 py-0 border-bottom"
    //     }
    //   >
    //     <div className={width >= 768 ? "me-3" : ""}>
    //       <Button
    //         as={Link}
    //         to="/dashboard"
    //         className="pt-3 pb-2 px-2 text-center border-0 bg-white w-100 rounded-0 text-dark fs-2 logo-height"
    //         onClick={() => {
    //           dispatch(changeTitle("dashboard"));
    //         }}
    //         // end
    //       >
    //         {CustomUIs.map((product, index) => (
    //           <img
    //             style={{ width: "80%", height: "80%", fontSize: "14px" }}
    //             src={serverURL.replace('/apps', '') + product.logo}
    //             alt="brand logo"
    //           />
    //         ))}
    //       </Button>
    //     </div>
    //   </Col>

    //   <Col
    //     lg={{ span: 10, offset: 2 }}
    //     md={{ span: 9, offset: 3 }}
    //     className={
    //       width >= 768 ? "position-fixed px-0 border-bottom" : "position-absolute px-0 border-bottom"
    //     }
    //   >
    //     <Navbar
    //       key={expand}
    //       bg="white"
    //       variant="light"
    //       expand={expand}
    //       className="pe-4 ps-2 py-1 h-navbar"
    //     >
    //       <Container fluid className="ps-2 pe-0">
    //         <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
    //         <Navbar.Offcanvas
    //           id={`offcanvasNavbar-expand-${expand}`}
    //           aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
    //           placement="end"
    //         >
    //           <Offcanvas.Header closeButton>
    //             <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
    //               <Button
    //                 as={Link}
    //                 to="/dashboard"
    //                 className="pt-3 pb-2 px-2 text-center border-0 bg-white w-100 rounded-0 text-dark fs-2 logo-height"
    //                 onClick={() => {
    //                   dispatch(changeTitle("dashboard"));
    //                 }}
    //                 // end
    //               >
    //                 {CustomUIs.map((product, index) => (
    //                   <img
    //                     style={{ width: "80%", height: "80%" }}
    //                     src={serverURL + product.logo}
    //                     alt="login form"
    //                   />
    //                 ))}
    //               </Button>
    //             </Offcanvas.Title>
    //           </Offcanvas.Header>
    //           <Offcanvas.Body
    //             className={
    //               width >= 768 ? "d-flex align-items-center logo-height" : ""
    //             }
    //           >
    //             <Nav className="justify-content-end flex-grow-1 pe-0">
    //                 <Form className="d-none d-flex search-fieldAttrib my-2" size="sm">
    //                   <Form.Control
    //                     id="nav-search"
    //                     type="search"
    //                     placeholder="Search"
    //                     className=" border-0 shadow-none"
    //                     aria-label="Search"
    //                   />
    //                   <Button className="border-0 py-1 bg-white text-black d-flex align-items-center">
    //                     <img
    //                       src={require("./icons/search.svg").default}
    //                       alt="search-icon"
    //                     />
    //                   </Button>
    //                 </Form>
    //               {/* <Profile isAuditDashboard={isAuditDashboard}/> */}
    //             </Nav>
    //           </Offcanvas.Body>
    //         </Navbar.Offcanvas>
    //       </Container>
    //     </Navbar>
    //   </Col>
    // </Row>
  );
}

export default Header;
