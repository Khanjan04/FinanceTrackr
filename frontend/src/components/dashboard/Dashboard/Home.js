import { useSelector } from "react-redux";

export default function Home() {
  const title_heading = useSelector((state) => state.header.title);

  return (
    <>
      {(() => {
        switch (title_heading) {
          case "dashboard":
            return (
              <div>
                <h3>Home</h3>
              </div>
            );
        }
      })()}
    </>
  );
}


// import { Col, Row } from "react-bootstrap";
// import { useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { changeTitle } from "../../../state/slices/header";
// import {
//   delayTime,
//   fadedelayTime,
// } from "../../../utils/transitionEffectParams";
// import { Fade } from "@mui/material";
// import "react-initials-avatar/lib/ReactInitialsAvatar.css";

// export default function Home() {
//   const [slideChecked, setSlideChecked] = useState(true);
//   const title_heading = useSelector((state) => state.header.title);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(changeTitle("dashboard"));
//   }, []);

//   return (
//     <div>
//       <div>
//         {(() => {
//           switch (title_heading) {
//             case "dashboard":
//               return (
//                 <div
//                   className="bg-white position-sticky top-0"
//                   style={{ zIndex: "500" }}
//                 >
//                   <span
//                     style={{ color: "#50514F" }}
//                     className="ff-poppins fs-24px fw-600"
//                   >
//                     <div className="d-flex align-items-center">
//                       <div className="fw-400 mt-3 mb-3 ff-poppins text-wrap">
//                         <span className="fs-22px text-color-h1 ps-4 fw-semibold ">
//                           Welcome to your Dashboard
//                         </span>
//                         <br />
//                       </div>
//                     </div>
//                   </span>
//                 </div>
//               );
//           }
//         })()}
//         <Fade timeout={fadedelayTime} in={slideChecked}></Fade>
//       </div>
//       <div className="home">
//         <h1>Main Home</h1>
//       </div>
//     </div>
//   );
// }
