import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import CrossIcon from "../../../images/cross.svg";
import Button from "react-bootstrap/Button";
import "../TimeComponent/timeComp.scss";
import { getAppAllocationInfo, getUserAllocationInfo } from "../../../api/apps";
import { showError } from "../../../utils/showMessage";
import useWindowDimensions from "../../../utils/getHeightWidth";
import { getAssetAllocationInfo } from "../../../api/asset";
import Select from "react-select";
import { fadedelayTime } from "../../../utils/transitionEffectParams";
import { Fade } from "@mui/material";
import {
  handleGetPolicy,
  handleSetPolicy,
  loadPolices,
} from "./helper_funtions";
import { getWebAppAllocationInfo } from "../../../api/web_app";
import { RxCross1 } from "react-icons/rx";
import CrossButton from "../ButtonSpinner/CrossButton";

import { Button as MUIButton } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Row, Col } from "react-bootstrap";
import GeneralButton from "../SaveButton/GeneralButton";

const TimeCompExtend = ({
  setOpenAlert,
  handleAlertAction,
  colName,
  toBeExtend,
  resource_id,
  SystemUserResourceList,
  alertMsg,
  resource_name,
  headingMsg,
  type,
  resource_type,
  entity_name,
  target_type,
  show_policy,
  target_entity_name,
}) => {
  const [from, setFrom] = useState("");
  const { width } = useWindowDimensions();
  const [fromTime, setFromTime] = useState("");
  const [to, setTo] = useState("");
  const [toTime, setToTime] = useState("");
  const [nowDate, setNowDate] = useState();
  const [nowTime, setNowTime] = useState();
  const [policy, setPolicy] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [systemuser, setSystemuser] = useState(null);
  const [currentsystemuser, setCurrentsystemuser] = useState(null);
  const [systemusers, setSystemusers] = useState(null);
  const [slideChecked, setSlideChecked] = useState(false);

  const ZERO_DAY_ALLOCATION = "zero_day_allocation";
  const CUSTOM = "custom";
  const LIFE_LONG_ALLOCATION = "life_long_allocation";
  const [allocationType, setAllocationType] = useState(CUSTOM);

  useEffect(() => {
    setSlideChecked(true);
  }, []);

  const handleLoadCall = async (allocation_type) => {
    let entity_id =
      type === "user" || type === "role"
        ? toBeExtend[0].id
        : toBeExtend[0].group_id;
    let response;
    if (resource_type === "apps") {
      response = await getAppAllocationInfo({
        entity_id: entity_id,
        app_id: resource_id,
        entity_type: type,
      });
    } else if (resource_type === "assets") {
      response = await getAssetAllocationInfo({
        entity_id: entity_id,
        asset_id: resource_id,
        entity_type: type,
      });
    } else {
      response = await getWebAppAllocationInfo({
        entity_id: entity_id,
        web_app_id: resource_id,
        entity_type: type,
      });
    }
    const data = response.data;
    const error = response.error;
    if (data != null) {
      let storedDate = new Date(data.from * 1000);
      setCurrentsystemuser(data.systemuser_id);
      if (!allocation_type) {
        setAllocationType(data.allocation_type);
      }
      setFrom(
        storedDate.getFullYear() +
          "-" +
          (storedDate.getMonth() < 9
            ? "0" + (storedDate.getMonth() + 1)
            : storedDate.getMonth() + 1) +
          "-" +
          (storedDate.getDate() <= 9
            ? "0" + storedDate.getDate()
            : storedDate.getDate())
      );
      setFromTime(
        (storedDate.getHours() <= 9
          ? "0" + storedDate.getHours()
          : storedDate.getHours()) +
          ":" +
          (storedDate.getMinutes() <= 9
            ? "0" + storedDate.getMinutes()
            : storedDate.getMinutes())
      );

      let storedToDate = new Date(data.to * 1000);
      setTo(
        storedToDate.getFullYear() +
          "-" +
          (storedToDate.getMonth() < 9
            ? "0" + (storedToDate.getMonth() + 1)
            : storedToDate.getMonth() + 1) +
          "-" +
          (storedToDate.getDate() <= 9
            ? "0" + storedToDate.getDate()
            : storedToDate.getDate())
      );
      setToTime(
        (storedToDate.getHours() <= 9
          ? "0" + storedToDate.getHours()
          : storedToDate.getHours()) +
          ":" +
          (storedToDate.getMinutes() <= 9
            ? "0" + storedToDate.getMinutes()
            : storedToDate.getMinutes())
      );
      setPolicy(data.policy);
    }
    if (error !== null) {
      showError(error);
    }
  };

  const getSystemUsers = async () => {
    var isresource = 0;
    if (resource_type === "assets") isresource = 1;
    else if (resource_type === "apps") isresource = 2;
    else isresource = 3;
    const { data } = await SystemUserResourceList({
      isresource: isresource,
      new: false,
      id: resource_id,
    });
    if (data !== null) {
      setSystemusers(
        data.map((user) => {
          user.label = user.system_display_username;
          user.value = user.id;
          return user;
        })
      );
    }
  };

  useEffect(() => {
    const now = new Date();
    setNowDate(
      now.getFullYear() +
        "-" +
        (now.getMonth() < 9 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1) +
        "-" +
        (now.getDate() <= 9 ? "0" + now.getDate() : now.getDate())
    );

    setNowTime(
      (now.getHours() <= 9 ? "0" + now.getHours() : now.getHours()) +
        ":" +
        (now.getMinutes() <= 9 ? "0" + now.getMinutes() : now.getMinutes())
    );
    handleLoadCall();
    getSystemUsers();
  }, []);
  useEffect(() => {
    try {
      let sysuser = systemusers.filter((user) => user.id === currentsystemuser);
      if (sysuser.length === 1) {
        sysuser[0].label = sysuser[0].system_display_username;
        sysuser[0].value = sysuser[0].id;
        setSystemuser(sysuser[0]);
      }
    } catch (error) {}
  }, [systemusers, currentsystemuser]);

  let finalFromDate, finalToDate;
  const handleSubmit = (e) => {
    e.preventDefault();
    finalFromDate = new Date(from + " " + fromTime + ":00");
    finalToDate = new Date(to + " " + toTime + ":59");
    handleAlertAction(
      finalFromDate,
      finalToDate,
      policy,
      systemuser.value,
      allocationType
    );
  };
  const handleLoadPolicies = () => {
    loadPolices([resource_id], resource_type, setPolicies);
  };
  const handleAllocationTabClick = (allocation_type) => {
    setAllocationType(allocation_type);
    if (allocation_type == ZERO_DAY_ALLOCATION) {
      setFrom(nowDate);
      setFromTime(nowTime);
      setTo(nowDate);
      setToTime(nowTime);
    } else if (allocation_type == LIFE_LONG_ALLOCATION) {
      const now = new Date();
      now.setFullYear(2099);
      setTo(now.toISOString().slice(0, 10));
      setToTime(nowTime);
    } else {
      handleLoadCall(allocation_type);
    }
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
              <p className="sub_heading_bold">
                <b>&nbsp;{target_entity_name} : </b>
              </p>
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
                    <Form.Group className="p-1 py-2 text-truncate col-md-6 col-sm-12">
                      <Form.Label className="title-style pb-1">Time</Form.Label>
                      <Form.Control
                        className="form_date_input_field"
                        type="time"
                        min={from > nowDate ? "00:00" : nowTime}
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
              {show_policy == true ? (
                <div className="container">
                  <div className="row border-bottom py-3">
                    <p className="display_names_heading mb-0 col-2">Sr No</p>
                    <p className="display_names_heading mb-0 col-3">
                      {target_type}
                    </p>
                    {show_policy && (
                      <p className="display_names_heading mb-0 col-7">
                        Policy <span className="text-danger">*</span>
                      </p>
                    )}
                  </div>
                  {colName.map((col, index) => (
                    <div
                      className="row justify-content-start  align-items-center my-3"
                      key={index}
                    >
                      <p className="display_names col-2 mb-0">{index + 1}.</p>
                      <p className="display_names col-3 mb-0" key={index}>
                        {col.name}
                      </p>
                      {show_policy && policies && (
                        <div className="col-7">
                          <Select
                            className="systemuser_select col-12 col-md-10"
                            classNamePrefix="asset"
                            getOptionLabel={(option) => option.policy_name}
                            getOptionValue={(option) => option.id}
                            isClearable={true}
                            isSearchable={true}
                            name="systemuser_select"
                            menuPlacement={
                              colName.length - 1 === index && colName.length > 2
                                ? "top"
                                : "bottom"
                            }
                            required={true}
                            options={policies[resource_name]}
                            onChange={(selectedOption) => {
                              setPolicy(selectedOption);
                            }}
                            value={policy}
                            onFocus={handleLoadPolicies}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="container">
                  <div className="row border-bottom py-3">
                    <p className="display_names_heading mb-0 col-2">Sr No</p>
                    <p className="display_names_heading mb-0 col-3">
                      {target_type}
                    </p>
                  </div>
                  {colName &&
                    colName.map((col, index) => (
                      <div
                        className="row justify-content-start  align-items-center my-3"
                        key={index}
                      >
                        <p className="display_names col-2 mb-0">{index + 1}.</p>
                        <p className="display_names col-3 mb-0" key={index}>
                          {col.name}
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div className="datetime-component ps-1 pt-3">
              <Form.Group
                as={Row}
                className="mb-3 justify-content-between align-items-center"
                controlId="sysusers"
              >
                <Form.Label column md={3} className="input_label">
                  System User <span className="text-danger">*</span>
                </Form.Label>
                <Col md={9}>
                  <Select
                    closeMenuOnSelect={true}
                    onChange={(e) => setSystemuser(e)}
                    value={systemuser}
                    options={systemusers}
                  />
                </Col>
              </Form.Group>
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
export default TimeCompExtend;
