import { IoAlertCircle } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

export const NotificationBar = ({ show, isError, message, onClose }) => {
  if (!show) return <div></div>;

  const notificationStyle = {
    height: "44px",
    borderBottom: `5px solid ${isError ? "#C50000" : "green"}`,
    backgroundColor: isError ? "#C5000014" : "#ddffdd",
    position: "relative",
  };

  const closeButtonStyle = {
    position: "absolute",
    right: "10px",
    cursor: "pointer",
  };

  return (
    <div
      style={notificationStyle}
      className="mb-3 rounded-2 ff-poppins d-flex align-items-center"
    >
      {typeof message === "string" ? (
        <>
          {isError ? (
            <div className="text-danger px-3">
              <IoAlertCircle />
            </div>
          ) : (
            <div className="text-success px-3">
              <FaCheckCircle />
            </div>
          )}
          <div className="fs-14px">{message}</div>
        </>
      ) : (
        message.map((str, index) => (
          <>
            <div className="text-danger px-3">
              <IoAlertCircle />
            </div>
            <div key={index} className="fs-14px">
              {str}
            </div>
          </>
        ))
      )}
      <span style={closeButtonStyle} onClick={onClose}>
        &times;
      </span>
    </div>
  );
};
