import { Button as MUIButton } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Fade from "@mui/material/Fade";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import useWindowDimensions from "../../../utils/getHeightWidth";
import { fadedelayTime } from "../../../utils/transitionEffectParams";
import CrossButton from "../ButtonSpinner/CrossButton";
import GeneralButton from "../SaveButton/GeneralButton";
import "../TimeComponent/timeComp.scss";
import {
  getSystemUsers,
  handleGetPolicy,
  handleGetSystemUser,
  handleSetPolicy,
  handleSetSystemUser,
  loadPolices,
} from "./helper_funtions";

const TimeComp = ({
  resource_id,
  resource_type,
  setOpenAlert,
  handleAlertAction,
  SystemUserResourceList,
  colName,
  alertMsg,
  headingMsg,
  resource_name,
  target_type,
  reverse_allocate,
  target_entity_name,
  show_policy,
}) => {
  const { width } = useWindowDimensions();
  const [from, setFrom] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [to, setTo] = useState("");
  const [toTime, setToTime] = useState("");
  const [nowDate, setNowDate] = useState("");
  const [nowTime, setNowTime] = useState("");
  const [policy, setPolicy] = useState(null);
  const [policies, setPolicies] = useState(null);
  const [systemuser, setSystemuser] = useState(null);
  const [systemusers, setSystemusers] = useState(null);

  const [slideChecked, setSlideChecked] = useState(false);

  const ZERO_DAY_ALLOCATION = "zero_day_allocation";
  const CUSTOM = "custom";
  const LIFE_LONG_ALLOCATION = "life_long_allocation";
  const [allocationType, setAllocationType] = useState(CUSTOM);

  const selectStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      paddingTop: "3px",
      paddingBottom: "3px",
      borderColor: "#ced4da",
      boxShadow: "none",
      fontFamily: '"DM Sans"',
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "21px",
      color: "#717171",

      ":hover": {
        borderColor: "#ced4da",
      },
    }),
    option: (styles) => ({
      ...styles,
      fontFamily: '"DM Sans"',
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "21px",
      textOverflow: "ellipsis",
      overflow: "hidden",
      ":hover": {
        whiteSpace: "normal",
        wordWrap: "break-word",
        overFlowWrap: "break-word",
      },
    }),
  };

  const handleAllocationTabClick = (allocation_type) => {
    setAllocationType(allocation_type);
  };
  useEffect(() => {
    setSlideChecked(true);
  }, []);
  useEffect(() => {
    let ids = [];
    if (resource_id) {
      ids = [resource_id];
    } else {
      for (let id in colName) {
        ids.push(colName[id].id);
      }
    }
    getSystemUsers(
      SystemUserResourceList,
      ids,
      resource_type,
      setSystemusers,
      setSystemuser,
      colName,
      reverse_allocate,
      target_entity_name
    );
    if (resource_type === "apps") {
      loadPolices(
        ids,
        resource_type,
        setPolicies,
        setPolicy,
        colName,
        reverse_allocate,
        target_entity_name
      );
    }
    const now = new Date();
    let date =
      now.getFullYear() +
      "-" +
      (now.getMonth() < 9 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1) +
      "-" +
      (now.getDate() < 9 ? "0" + now.getDate() : now.getDate());
    let time =
      (now.getHours() <= 9 ? "0" + now.getHours() : now.getHours()) +
      ":" +
      (now.getMinutes() <= 9 ? "0" + now.getMinutes() : now.getMinutes());
    setNowDate(date);
    setNowTime(time);
    setFrom(date);
    setFromTime(time);
    if (allocationType == LIFE_LONG_ALLOCATION) {
      now.setFullYear(2099);
      setTo(now.toISOString().slice(0, 10));
    } else {
      setTo(date);
    }
    setToTime(time);
  }, [allocationType]);

  let finalFromDate, finalToDate;
  const handleSubmit = (e) => {
    e.preventDefault();
    finalFromDate = new Date(from + " " + fromTime + ":00");
    finalToDate = new Date(to + " " + toTime + ":59");
    handleAlertAction(
      finalFromDate,
      finalToDate,
      policy,
      systemuser,
      allocationType
    );
  };

  return (
    <Fade timeout={fadedelayTime} in={slideChecked}>
      <div>
        <Form onSubmit={handleSubmit} className="main_content_container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="main_content_heading">{headingMsg}</h2>
            <CrossButton onClick={() => setOpenAlert((o) => !o)}></CrossButton>
          </div>
          <div>
            <div className="d-flex flex-row justify-content-start align-items-center">
              <p className="sub_heading">{alertMsg} </p>
              <p className="sub_heading_bold">&nbsp;{target_entity_name} :</p>
            </div>
            <div className="datetime-component row text-center me-0 ms-0">
              <ButtonGroup
                className="py-4 px-3"
                variant="outlined"
                aria-label="outlined primary button group"
              >
                <MUIButton
                  className="px-4 py-2"
                  onClick={() => handleAllocationTabClick(CUSTOM)}
                  variant={allocationType === CUSTOM ? "contained" : "outlined"}
                >
                  Custom
                </MUIButton>
                <MUIButton
                  className="px-4 py-2"
                  onClick={() => handleAllocationTabClick(ZERO_DAY_ALLOCATION)}
                  variant={
                    allocationType === ZERO_DAY_ALLOCATION
                      ? "contained"
                      : "outlined"
                  }
                >
                  Zero day Allocation
                </MUIButton>
                <MUIButton
                  className="px-4 py-2"
                  onClick={() => handleAllocationTabClick(LIFE_LONG_ALLOCATION)}
                  variant={
                    allocationType === LIFE_LONG_ALLOCATION
                      ? "contained"
                      : "outlined"
                  }
                >
                  Life Long Allocation
                </MUIButton>
              </ButtonGroup>
              {allocationType === CUSTOM ? (
                <>
                  <div
                    className={
                      width >= 992
                        ? "col-md-12 col-lg-6 col-sm-12 row border-end border-top pb-2"
                        : "col-md-12 col-lg-6 col-sm-12 row border-bottom pb-2"
                    }
                  >
                    <Form.Group className="p-1 py-2 text-truncate col-md-6 col-sm-12">
                      <Form.Label className="title-style pb-1">From</Form.Label>
                      <Form.Control
                        className="form_date_input_field"
                        type="date"
                        value={from}
                        min={nowDate}
                        onChange={(e) => {
                          setFrom(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="p-1 py-2 col-md-6 col-sm-12 text-truncate">
                      <Form.Label className="title-style pb-1">Time</Form.Label>
                      <Form.Control
                        className="form_date_input_field"
                        type="time"
                        min={nowTime}
                        value={fromTime}
                        onChange={(e) => {
                          setFromTime(e.target.value);
                        }}
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-12 col-lg-6 border-top col-sm-12 row pb-2">
                    <Form.Group className="p-1 py-2 col-md-6 col-sm-12 text-truncate">
                      <Form.Label className="title-style pb-1">To</Form.Label>
                      <Form.Control
                        className="form_date_input_field"
                        type="date"
                        value={to}
                        min={from}
                        onChange={(e) => {
                          setTo(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="p-1 py-2 col-md-6 col-sm-12 text-truncate">
                      <Form.Label className="title-style pb-1">Time</Form.Label>
                      <Form.Control
                        className="form_date_input_field"
                        type="time"
                        max="23:59"
                        value={toTime}
                        min={to > from ? "00:00" : fromTime}
                        onChange={(e) => {
                          setToTime(e.target.value);
                        }}
                        required
                      />
                    </Form.Group>
                  </div>
                </>
              ) : allocationType === ZERO_DAY_ALLOCATION ? (
                <div
                  className={
                    width >= 992
                      ? "col-12 row border-end border-top py-4"
                      : "col-12 row border-bottom py-4"
                  }
                >
                  <p className="ff-pam-dm-sans">
                    <span className="fw-600">Zero Day Allocation</span> -{" "}
                    {alertMsg} {resource_name} but will not be granted access to
                    this resource.
                  </p>
                </div>
              ) : allocationType === LIFE_LONG_ALLOCATION ? (
                <div
                  className={
                    width >= 992
                      ? "col-12 row border-end border-top py-4"
                      : "col-12 row border-bottom py-4"
                  }
                >
                  <p className="ff-pam-dm-sans">
                    <span className="fw-600">Life Long Allocation</span> -{" "}
                    {alertMsg} {resource_name} for life time.
                  </p>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="d-flex flex-column flex-wrap assign_policy_container mt-3 datetime-component">
              <div className="container">
                <div className="row border-bottom py-3">
                  <p
                    className={
                      show_policy
                        ? "display_names_heading mb-0 col-1"
                        : "display_names_heading mb-0 col-2"
                    }
                  >
                    Sr No
                  </p>
                  <p
                    className={
                      show_policy
                        ? "display_names_heading mb-0 col-2"
                        : "display_names_heading mb-0 col-3"
                    }
                  >
                    {target_type}
                  </p>
                  <p
                    className={
                      show_policy
                        ? "display_names_heading mb-0 col-4"
                        : "display_names_heading mb-0 col-7"
                    }
                  >
                    System User <span className="text-danger">*</span>
                  </p>
                  {show_policy && (
                    <p className="display_names_heading mb-0 col-5">
                      Policy <span className="text-danger">*</span>
                    </p>
                  )}
                </div>
                {colName.map((col, index) => (
                  <div
                    className="row justify-content-start  align-items-center my-3"
                    key={index}
                  >
                    <p
                      className={
                        show_policy
                          ? "display_names col-1 mb-0"
                          : "display_names col-2 mb-0"
                      }
                    >
                      {index + 1}.
                    </p>

                    <p
                      className={
                        show_policy
                          ? "display_names allocate_resource_name col-2 mb-0"
                          : "display_names allocate_resource_name col-3 mb-0"
                      }
                      key={index}
                    >
                      {col.name}
                    </p>
                    {systemusers && (
                      <div
                        className={
                          show_policy
                            ? "display_names col-4 mb-0"
                            : "display_names col-6 mb-0"
                        }
                      >
                        <Select
                          className="systemuser_select col-12 col-md-11"
                          getOptionLabel={(option) =>
                            option.system_display_username
                          }
                          getOptionValue={(option) => option.id}
                          isSearchable={true}
                          required={true}
                          styles={selectStyles}
                          menuPlacement={
                            colName.length - 1 === index && colName.length > 2
                              ? "top"
                              : "bottom"
                          }
                          options={
                            resource_id
                              ? systemusers[resource_name]
                              : systemusers[col.name]
                          }
                          noOptionsMessage={() => "No system user associated"}
                          onChange={(selectedOption) => {
                            handleSetSystemUser(
                              col.id,
                              selectedOption,
                              systemuser,
                              setSystemuser
                            );
                          }}
                          value={handleGetSystemUser(col.id, systemuser)}
                        />
                      </div>
                    )}
                    {show_policy && policies && (
                      <div className="display_names col-5 mb-0">
                        <Select
                          className="systemuser_select col-12 col-md-10"
                          getOptionLabel={(option) => option.policy_name}
                          getOptionValue={(option) => option.id}
                          isSearchable={true}
                          required={true}
                          styles={selectStyles}
                          menuPlacement={
                            colName.length - 1 === index && colName.length > 2
                              ? "top"
                              : "bottom"
                          }
                          options={
                            resource_id
                              ? policies[resource_name]
                              : policies[col.name]
                          }
                          noOptionsMessage={() => "No policy associated"}
                          onChange={(selectedOption) => {
                            handleSetPolicy(
                              col.id,
                              selectedOption,
                              policy,
                              setPolicy
                            );
                          }}
                          value={handleGetPolicy(col.id, policy)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Row className="pt-4 mb-3 justify-content-end">
            <Col sm="auto">
              <GeneralButton
                onClickEvent={() => setOpenAlert((o) => !o)}
                className="me-1"
                value="Cancel"
                color="#505050"
                variant="outlined"
                size="large"
              />
            </Col>
            <Col sm="auto" className="me-sm-2 p-0">
              <GeneralButton
                className="me-1"
                value="Confirm"
                variant="contained"
                size="large"
              />
            </Col>
          </Row>
        </Form>
      </div>
    </Fade>
  );
};
export default TimeComp;
