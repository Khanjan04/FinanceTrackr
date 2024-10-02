import React, { useState } from 'react';
import images from "../../../utils/images";
import { showErrorMsg } from '../../../utils/showMessage';
import CustomModal from '../CustomModal/CustomModal';
import { Form } from 'react-bootstrap';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";



const FileUpload = ({ width, openModal, setOpenModal, heading, formLabel, fileInvalidMessage, invalidFileDataMessage, dirToCompare, fileType, handleFileSubmit, maxFileSize }) => {

    const [buttonAble, setButtonAble] = useState(true);
    const fileRegex = new RegExp("[^.]+$");
    const [isRequiredFormat, setIsRequiredFormat] = useState(true);
    const [fileSizeExceed, setFileSizeExceed] = useState(false);
    const [fileData, setFileData] = useState({});
    const [FileValidity, setFileValidity] = useState(false);
    const fileSizeExceedMessage = `File size exceeds ${maxFileSize.label}`;
    const notRequiredFormatMessage = `Selected file is not a ${fileType.join(", ")}`;


    const compareFileData = (obj1, obj2) => {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        return (
            keys1.length === keys2.length &&
            keys1.every((key) => obj2.hasOwnProperty(key))
        );
    };
    const handleClose = () => {
        setFileSizeExceed(false);
        setFileValidity(false);
        setIsRequiredFormat(true);
        setOpenModal((o) => !o);
        setButtonAble(true);
    };
    const handleFileSelect = (event) => {
        if (event.target.files.length > 0) {
            let extension = event.target.files[0].name.toLowerCase().match(fileRegex);
            if (fileType.includes(getExtension(extension[0]))) {
                if (event.target.files[0].size > maxFileSize.value) {
                    setIsRequiredFormat(true);
                    showErrorMsg("File size exceeds maximum");
                    setButtonAble(true);
                    setFileSizeExceed(true);
                } else {
                    const fileReader = new FileReader();
                    fileReader.readAsText(event.target.files[0], "UTF-8");
                    fileReader.onload = (event) => {
                        let fileResult = "";
                        switch (getExtension(extension[0])) {
                            case "json":
                                fileResult = JSON.parse(event.target.result);
                                break;
                            default:
                                fileResult = event.target.result
                        }
                        if (dirToCompare) {
                            if (compareFileData(fileResult, dirToCompare)) {
                                setFileData(fileResult);
                                setButtonAble(false);
                                setFileValidity(false);
                                setFileSizeExceed(false);
                                setIsRequiredFormat(true);
                            } else {
                                showErrorMsg(invalidFileDataMessage);
                                setFileValidity(true);
                                setButtonAble(true);
                                setIsRequiredFormat(true);
                            }
                        } else {
                            setButtonAble(false);
                            setFileData(fileResult);
                        }
                    };
                }
            } else {
                showErrorMsg(`Selected file is not a valid ${fileType} file`);
                setFileSizeExceed(false);
                setFileValidity(false);
                setButtonAble(true);
                setIsRequiredFormat(false);
            }
        }
    };
    const getExtension = (filename) => {
        return filename.split(".").pop();
    };

    return (
        <CustomModal
            open={openModal}
            width={`40%`}
        >
            <Form>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h2 className="main_content_heading m-0">
                        {heading}
                    </h2>
                    <img
                        src={images.CrossIcon}
                        alt="close"
                        className="cursor_pointer"
                        onClick={handleClose}
                    />
                </div>
                <div className="py-2">
                    <Form.Group
                        controlId="formFile"
                        className="mb-3"
                    >
                        <Form.Label>{formLabel}</Form.Label>
                        <Form.Control
                            onChange={handleFileSelect}
                            type="file"
                            accept={"." + fileType.join(",.")}
                        />
                        <div class="ff-poppins fs-12px d-flex bd-highlight">
                            <div class="me-auto p-1 bd-highlight text-danger">
                                {fileSizeExceed === true ? fileSizeExceedMessage : ""}
                                {isRequiredFormat === true ? "" : notRequiredFormatMessage}
                                {FileValidity == true ? fileInvalidMessage : ""}
                            </div>
                            <div class="p-1 bd-highlight">
                                Max size : {maxFileSize.label}
                            </div>
                        </div>
                    </Form.Group>
                </div>
                <Row className="mb-3 justify-content-end">
                    <Col sm="auto">
                        <Button
                            variant="light"
                            as="input"
                            type="button"
                            className="user_cancel_button"
                            value="Cancel"
                            onClick={handleClose}
                        />
                    </Col>
                    <Col sm="auto" className="me-sm-2 p-0">
                        <Button
                            as="input"
                            type="button"
                            onClick={() => handleFileSubmit(fileData, handleClose)}
                            value="Import"
                            className="user_submit_button"
                            disabled={buttonAble}
                        />
                    </Col>
                </Row>
            </Form>
        </CustomModal>
    )
}

export default FileUpload
