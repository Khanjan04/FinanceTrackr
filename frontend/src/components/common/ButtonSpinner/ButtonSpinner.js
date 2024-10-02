import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "react-initials-avatar/lib/ReactInitialsAvatar.css";
import "react-tabs/style/react-tabs.css";
function ButtonSpinner({ width, height, color }) {
  return (
    <>
      <Spinner
        style={{
          width: `${width}`,
          height: `${height}`,
          color: `${color}`,
        }}
        animation="border"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  );
}
export default ButtonSpinner;
