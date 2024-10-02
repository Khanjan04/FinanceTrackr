// import React, { useEffect, useState } from "react";
// import { NavDropdown } from "react-bootstrap";
// import { MdArrowDropDown } from "react-icons/md";
// import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { get_jwt_token, loginRedirect } from "../../../api/helper_funtions";
// import { clearErrors, logoutUser } from "../../../state/slices/user";
// import { showError } from "../../../utils/showMessage";
// import "./Header.scss";
// import GetCapabilities from "../../../utils/getCapabilities";
// function Profile(props) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const my_capabilities=GetCapabilities();
//   const isCapable =my_capabilities[0]
//   const isCapableEnduser=  my_capabilities[1]
//   const email = useSelector((state) => state.user.user.email);
//   const first_name = useSelector((state) => state.user.user.first_name);
//   const last_name = useSelector((state) => state.user.user.last_name);
//   const username = useSelector((state) => state.user.user.username);
//   const name = first_name + " " + last_name;
//   const { error } = useSelector((state) => state.user);
//   useEffect(() => {
//     if (error) {
//       showError(error);
//       dispatch(clearErrors());
//     }
//   }, [error, dispatch]);
//   const handleLogout = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     const token = get_jwt_token();
//     loginRedirect(token)
//     dispatch(logoutUser());
//   };
//   const [show, setShow] = useState(false);
//   const showDropdown = (e)=>{
//       setShow(!show);
//   }
//   const hideDropdown = e => {
//       setShow(false);
//   }
//   const { isEndUser } = props;
//   const { isAuditDashboard } = props;
//   return (
//       <NavDropdown show={show}
//    onMouseEnter={showDropdown}
//    onMouseLeave={hideDropdown}
//       align="end"
//       title={
//         <div>
//           <span style={{fontSize:'15px',color:'black'}}>
//               <img className="avatar mx-1" src={require("./icons/prof_per.svg").default}alt="user icon"/> {username}<MdArrowDropDown className="mx-1"></MdArrowDropDown>
//           </span>
//         </div>
//       }
//       id="collasible-nav-dropdown"
//       className="mt-2"
//     >
//         <div className="ff-poppins fs-14px fw-400">
//           <NavDropdown.Item onClick={() => {
//             if (isAuditDashboard == false) {
//               navigate("/dashboard/users-profile")
//             } else {
//               navigate("/audit-dashboard/users-profile")
//             }
//           }} className="ps-1 py-2  text-color-prof "><img className="px-3 pb-1"
//                                                           src={require("./icons/prof_per.svg").default}
//                                                           alt="users icon"/>Personal Profile</NavDropdown.Item>
//           {((isCapableEnduser && isCapableEnduser.allow_password_change) || (isCapable && isCapable.users.user.change_password)) &&
//               <NavDropdown.Item onClick={() => {
//                 if (isAuditDashboard == false) {
//                   navigate("/dashboard/change-password")
//                 } else {
//                   navigate("/audit-dashboard/change-password")
//                 }
//               }} className=" ps-1 py-2 drop_border text-color-prof "><img className="px-3 pb-1"
//                                                                           src={require("./icons/change_password.svg").default}
//                                                                           alt="password icon"/>Change
//                 Password</NavDropdown.Item>}
//           <NavDropdown.Item className=" ps-1 py-2 text-color-prof " onClick={handleLogout}><img className="px-3 pb-1"
//                                                                                                 src={require("./icons/logout.svg").default}
//                                                                                                 alt="logout icon"/>Logout</NavDropdown.Item>
//         </div>
//     </NavDropdown>

//   );
// }
// export default Profile;
