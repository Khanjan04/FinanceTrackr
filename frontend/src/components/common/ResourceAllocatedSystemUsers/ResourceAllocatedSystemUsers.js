import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CrossIcon from "../../../images/cross.svg";
import GeneralButton from "../SaveButton/GeneralButton";

const ResourceAllocatedSystemUsers = ({
  systemUserList,
  setOpenSystemUserSelect,
  rowID,
  checkIfMFARequired,
  systemUserId,
  setSystemUserId,
  resourceType,
}) => {
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    setSystemUserId(systemUserList[0].id);
  }, []);

  const handleRadioChange = (event) => {
    setSystemUserId(event.target.value);
  };

  useEffect(() => {
    let systemuser = systemUserList.find((item) => item.id == systemUserId);
    if (
      systemuser !== undefined &&
      systemuser.access_until === "Access Expired"
    )
      setAccessDenied(true);
    else setAccessDenied(false);
  }, [systemUserId]);

  return (
    <>
      <Form className="h-100">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="main_content_heading mb-0">Access system users</h2>
            <p className="ff-pam fw-300 fs-16px mb-0">{`Select system user for accessing the ${resourceType}`}</p>
          </div>
          <img
            src={CrossIcon}
            alt="close"
            className="cursor_pointer"
            onClick={() => {
              setSystemUserId(null);
              setOpenSystemUserSelect(false);
            }}
          />
        </div>
        <div
          style={{
            border: "1px solid #CBCBCB",
            borderRadius: "6px",
            backgroundColor: "#F9F9F9",
          }}
          className="mb-3"
        >
          <div className="container">
            <div className="row pt-2">
              <div className="col-md-5 ff-pam fw-500">Display Name</div>
              <div className="col-md-7 ff-pam fw-500">Access Until</div>
            </div>
          </div>

          <hr className="my-2"></hr>

          <div
            style={{ height: "50px !important", overflow: "auto !important" }}
            className="container h-50 overflow-auto"
          >
            {systemUserList.map((system_user, index) => (
              <div key={index} className="row pt-2 pb-2">
                <Form.Check
                  className="col-md-5 ff-pam"
                  type="radio"
                  id={`default-radio-systemuser-${index}`}
                  label={system_user.system_display_username}
                  name="radioGroup"
                  value={system_user.id}
                  checked={systemUserId == system_user.id}
                  onChange={handleRadioChange}
                />
                <div className="col-md-7">{system_user.access_until}</div>
              </div>
            ))}
          </div>
        </div>
        <Row className="mb-3 pt-3 justify-content-end">
          <Col sm="auto">
            <GeneralButton
              onClickEvent={() => {
                setSystemUserId(null);
                setOpenSystemUserSelect(false);
              }}
              className="me-1"
              value="Cancel"
              color="#505050"
              variant="outlined"
              size="large"
            />
          </Col>
          <Col sm="auto" className="me-sm-2 p-0">
            <GeneralButton
              onClickEvent={() => checkIfMFARequired(rowID)}
              className="me-1"
              value="Access"
              variant="contained"
              size="large"
            />
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ResourceAllocatedSystemUsers;
