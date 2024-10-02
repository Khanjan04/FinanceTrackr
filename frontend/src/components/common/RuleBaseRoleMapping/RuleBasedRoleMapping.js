import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { listRole } from "../../../api/role";
import images from "../../../utils/images";
import { showError } from "../../../utils/showMessage";
import "./RuleBasedRoleMapping.scss";
import { GetMinioAttributeData, getExternalIdpData } from "../../../api/sso";
import GeneralButton from "../SaveButton/GeneralButton";
const RuleBasedRoleMapping = ({
  rows,
  setRows,
  attributeNameList,
  setAttributeList,
  oauthappname,
}) => {
  let attributeNameOptions = [];
  for (let i in attributeNameList) {
    attributeNameOptions.push({
      label: attributeNameList[i],
      value: attributeNameList[i],
    });
  }
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
      textTransform: "none",
    }),
    option: (styles) => ({
      ...styles,
      fontFamily: '"DM Sans"',
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "21px",
      textTransform: "none",
    }),
  };

  const [roles, setRoles] = useState([]);
  const getRoles = async () => {
    const { data, error } = await listRole({ page: -1, page_size: -1 });
    if (data !== null) {
      setRoles(data.roles);
    }
    if (error !== null) {
      showError(error);
    }
  };
  useEffect(() => {
    getRoles();
  }, []);

  const handleAddAttribute = () => {
    if (roles.length > 0) {
      setRows((rows) => [
        ...rows,
        {
          role: {
            role_id: roles[0].role_id,
            display_name: roles[0].display_name,
          },
          attribute_name:
            attributeNameOptions.length > 0 && attributeNameOptions[0].value,
          attribute_value: "",
        },
      ]);
    }
  };
  const handleRemoveAttribute = (e, index) => {
    const tempRows = [...rows];
    tempRows.splice(index, 1);
    setRows(tempRows);
  };
  const handleSelectRole = (selectedOption, index) => {
    let tempRows = [...rows];
    tempRows[index].role = selectedOption;
    setRows(tempRows);
  };
  const handleAttributeNameChange = (selectedOption, index) => {
    let tempRows = [...rows];
    tempRows[index].attribute_name = selectedOption.value;
    setRows(tempRows);
  };
  const handleAttributeValueChange = (e, index) => {
    let tempRows = [...rows];
    tempRows[index].attribute_value = e.target.value;
    setRows(tempRows);
  };
  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = rows;
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setRows(tempData);
  };
  let refreshAttributes;
  if (oauthappname) {
    refreshAttributes = async () => {
      const { data, error } = await GetMinioAttributeData(oauthappname);
      if (data !== null) {
        if (data.data !== null) {
          setAttributeList(data["list"]);
        }
      } else {
        return null;
      }
    };
  } else {
    refreshAttributes = async () => {
      const { data, error } = await getExternalIdpData();
      if (data !== null && data.hasOwnProperty("data")) {
        if (data.data !== null) {
          setAttributeList(data["list"]);
        }
      } else {
        return null;
      }
    };
  }
  return (
    <div>
      <div className="pb-2 border-bottom border-1 mt-3">
        <h2 className="mapping_heading_label">Rule Based Role Mapping</h2>
        <p className="mapping_paragraph_label">
          Rule-based role mapping is a systematic approach where specific roles
          are assigned to users based on predefined criteria and set rules.
        </p>
      </div>
      <div>
        <div className="d-flex justify-content-start align-items-center mt-3">
          <GeneralButton
              onClickEvent={handleAddAttribute}
              className="fs-16px fw-600"
              startIcon={<img
                src={images.AddCircleOutline}
                alt="+"
                className="cursor_pointer"
                onClick={handleAddAttribute}
              />
              }
              value=" Add New Role Mapping"
            />
        </div>
      </div>
      {rows.length > 0 && (
        <Row className="mt-3 justify-content-between align-items-center">
          <Col md={4}>
            <div className="d-flex justify-content-start align-items-center">
              <div
                className="me-3"
                style={{ width: "35px", height: "35px" }}
              ></div>
              <h3 className="input_label">Attribute Name</h3>
            </div>
          </Col>
          <Col md={3}>
            <h3 className="input_label">Attribute Value</h3>
          </Col>
          <Col md={2}>
            <h3 className="input_label">Role</h3>
          </Col>
          <Col md={2}></Col>
        </Row>
      )}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable-1">
          {(provider) => (
            <div
              className="text-capitalize"
              ref={provider.innerRef}
              {...provider.droppableProps}
            >
              {rows?.map((item, index) => (
                <Draggable
                  key={index}
                  draggableId={String(index)}
                  index={index}
                >
                  {(provider) => (
                    <>
                      <Row
                        className="mt-3 justify-content-between align-items-center"
                        {...provider.draggableProps}
                        ref={provider.innerRef}
                      >
                        <Col md={4}>
                          <div className="d-flex justify-content-between align-items-center">
                            <img
                              style={{ width: "30px" }}
                              src={images.DragIndicator}
                              alt="d"
                              {...provider.dragHandleProps}
                              className="me-3"
                            />
                            <Select
                              onMenuOpen={refreshAttributes}
                              className="systemuser_select flex-grow-1"
                              classNamePrefix="rule_based_mapping"
                              isSearchable={true}
                              name="mapping_select"
                              options={attributeNameOptions}
                              onChange={(selectedOption) =>
                                handleAttributeNameChange(selectedOption, index)
                              }
                              styles={selectStyles}
                              value={attributeNameOptions.find(
                                (options) =>
                                  options.value === item.attribute_name
                              )}
                            />
                          </div>
                        </Col>
                        <Col md={3}>
                          <Form.Control
                            type="text"
                            onChange={(e) => {
                              handleAttributeValueChange(e, index);
                            }}
                            value={rows[index].attribute_value}
                            placeholder="Attribute Value"
                            className="rule_based_input_field"
                          />
                        </Col>
                        <Col md={3}>
                          <Select
                            className="systemuser_select"
                            classNamePrefix="rule_based_mapping"
                            getOptionLabel={(option) => option.display_name}
                            getOptionValue={(option) => option.role_id}
                            isSearchable={true}
                            name="mapping_select"
                            options={roles}
                            onChange={(selectedOption) =>
                              handleSelectRole(selectedOption, index)
                            }
                            styles={selectStyles}
                            value={item.role}
                          />
                        </Col>
                        <Col md={1}>
                          <button
                            type="button"
                            className="mapping-remove-btn"
                            onClick={(e) => {
                              handleRemoveAttribute(e, index);
                            }}
                          >
                            <img src={images.TrashIcon} alt="Remove" />
                          </button>
                        </Col>
                      </Row>
                    </>
                  )}
                </Draggable>
              ))}
              {provider.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default RuleBasedRoleMapping;
