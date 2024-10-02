import React from "react";
import CrossIcon from "../../../images/cross.svg"
// import {
//   GetColumnPreference,
//   PutColumnPreference,
//   PostColumnPreference,
// } from "../../../api/column_pref";
import "./customize_column.scss";
import { useState } from "react";
import CutomColumn from "../../../images/customcolumn.svg";
import CustomModal from "../CustomModal/CustomModal";
import CrossButton from "../ButtonSpinner/CrossButton";
import GeneralButton from "../SaveButton/GeneralButton";
import {Col,Row} from "react-bootstrap";
export const GetColmn = async (setCheckedStateDict, page_url, checkedStateDict, setColCount) => {
  const countFalseValues= (obj) => {
    return Object.values(obj).reduce((acc, val) => acc + (val === false ? 1 : 0), 0);
}
  const { data, error } = await PostColumnPreference(checkedStateDict,page_url);
    setColCount && setColCount(countFalseValues(data.data.options));
    setCheckedStateDict(data.data.options);
};

export const CustomizeColumn = ({
  page_url,setCheckedStateDict,checkedStateDict
}) => {
  const [show, setShow] = useState(false);
  /* customize column modal show. */
  const handleShow = () => {
    setShow(true);
    GetColmn(setCheckedStateDict, page_url);
  };

  /* customize column modal handleclose */
  const handleClose = () => {
    setShow(false);
    const PutColmn = async () => {
      const { data, error } = await PutColumnPreference(checkedStateDict, page_url);
      if (data != null) {
        setCheckedStateDict(data.data.options);
      }
    };
    PutColmn();
  };
  const handleOnChangeDict =(item)=>{
    var tempCheckedDict=checkedStateDict
    var itemValue=tempCheckedDict[item]
    tempCheckedDict[item]=!itemValue
    setCheckedStateDict(oldDict=>({...oldDict}))
  }

  const options=[]
  for(const item in checkedStateDict){
    options.push(
    <div key={item} className="mb-2 rounded custom-pointer border p-2"
    onClick={() => handleOnChangeDict(item)}>
    <input
        type="checkbox"
        className="mx-3 custom-pointer checkbox_size"
        checked={checkedStateDict[item]}
        onChange={() => handleOnChangeDict(item)}
      />
      <label className="custom-pointer">{item}</label>
    </div>
    )
  }

  return (
    <>
      <CustomModal open={show} handleClose={()=>{setShow(false)}} width="30% !important">
        <div>
          <div className="d-flex justify-content-between align-items-center  mb-4">
            <h3 className="border-0 customize-column-name mb-0 me-5">Customize Columns</h3>
            <CrossButton onClick={() =>{
              setShow(false)
              GetColmn(setCheckedStateDict, page_url)
            }}></CrossButton>
          </div>
          <div className="custom-modal-body pb-0">
            {options}
          </div>
          <Row className="pt-4 mb-3 justify-content-end">
                <Col sm="auto">
                  <GeneralButton onClickEvent={() => {
                setShow(false);
                GetColmn(setCheckedStateDict, page_url);
              }} className="me-1" value='Cancel' color='#505050' variant='outlined' size='medium'></GeneralButton>
                </Col>
                <Col sm="auto" className="me-sm-2 p-0">
                    <GeneralButton onClickEvent={handleClose} className="me-1" value='Save' variant='contained' size='medium'></GeneralButton>
                </Col>
              </Row>
        </div>
      </CustomModal>
      <div className="d-flex align-items-center qu">
        <button onClick={handleShow} className="advance_filter_button">
          <img src={CutomColumn} alt="icon" id="center-blueShadow" />
        </button>
      </div>
    </>
  );
};
