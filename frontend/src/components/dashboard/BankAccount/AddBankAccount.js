import { Fade } from "@mui/material";
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Select from "react-select";
import images from "../../../utils/images";
import { showError, showSuccess } from "../../../utils/showMessage";
import { fadedelayTime } from "../../../utils/transitionEffectParams";
import CrossButton from "../../common/ButtonSpinner/CrossButton";
import GeneralButton from "../../common/SaveButton/GeneralButton";
import { addBankAccount } from "../../../api/bankAccount";

const AddBankAccountInstance = ({ setOpenAddBankAccount, setBankAccountInstance, getBankAccountList }) => {
  const [bank, setBank] = useState("hdfc");
  const [displayName, setDisplayName] = useState("");
  const [ifsCode, setIFSCode] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [slideChecked, setSlideChecked] = useState(false);

  useEffect(() => {
    setSlideChecked(true);
  }, []);
  
  const bankAccount_types = [
    { value: "hdfc", label: "HDFC" },
    { value: "icici", label: "ICICI" },
    { value: "sbi", label: "SBI" },
  ];

  const selectStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      paddingTop: "3px",
      paddingBottom: "3px",
      borderColor: "#ced4da",
      boxShadow: "none",
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
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "21px",
    }),
  };

  const addBankAccountFormHandler = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      setLoading(true);

      const { data, error } = await addBankAccount({
        ...(bank !== "" && { bank: bank }),
        ...(accountNo !== "" && { accountNo: accountNo }),
        ...(displayName !== "" && { displayName: displayName }),
        ...(ifsCode !== "" && { ifscode: ifsCode }),
      });
      if (data !== null) {
        showSuccess(data);
        setLoading(false);
        setOpenAddBankAccount((o) => !o);
        setBankAccountInstance(new Object());
      }
      if (error !== null) {
        showError(error);
        setLoading(false);
      }
      getBankAccountList();
    }
  };

  return (
    <Fade timeout={fadedelayTime} in={slideChecked}>
      <div>
        <Container fluid className="main_content_container mx-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h3 className="main_content_heading">Add Bank Account</h3>
            <CrossButton
              onClick={() => setOpenAddBankAccount((o) => !o)}
            ></CrossButton>
          </div>
          <Form
            noValidate
            validated={validated}
            onSubmit={addBankAccountFormHandler}
            className="add_asset_form"
          >
            <Stack gap={1}>
              <Form.Group
                as={Row}
                className="mb-3 justify-content-between"
                controlId="formPlaintextAssetType"
              >
                <Form.Label column md={3} className="input_label">
                  Bank <span className="text-danger">*</span>
                </Form.Label>
                <Col md={9}>
                  <Select
                    defaultValue={bankAccount_types[0]}
                    name="asset_type"
                    required={true}
                    options={bankAccount_types}
                    onChange={(selectedOption) => setBank(selectedOption.value)}
                    styles={selectStyles}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3 justify-content-between"
                controlId="formPlaintextAssetType"
              >
                <Form.Label column md={3} className="input_label">
                  Account No. <span className="text-danger">*</span>
                </Form.Label>
                <Col md={9}>
                  <Form.Control
                    required
                    className="form_input_field"
                    type="number"
                    value={accountNo}
                    onChange={(event) => setAccountNo(event.target.value)}
                    placeholder="Account No."
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter account number.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3 justify-content-between"
                controlId="formPlaintextAssetType"
              >
                <Form.Label column md={3} className="input_label">
                  Display Name <span className="text-danger">*</span>
                </Form.Label>
                <Col md={9}>
                  <Form.Control
                    required
                    className="form_input_field"
                    type="text"
                    value={displayName}
                    onChange={(event) => setDisplayName(event.target.value)}
                    placeholder="Display Name"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter an display name.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3 justify-content-between"
                controlId="formPlaintextAssetType"
              >
                <Form.Label column md={3} className="input_label">
                  IFS Code <span className="text-danger">*</span>
                </Form.Label>
                <Col md={9}>
                  <Form.Control
                    required
                    className="form_input_field"
                    type="text"
                    value={ifsCode}
                    onChange={(event) => setIFSCode(event.target.value)}
                    placeholder="IFS Code"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a IFS Code.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Row className="pt-9 mb-1 justify-content-end">
                <Col sm="auto">
                  <GeneralButton
                    onClickEvent={() => setOpenAddBankAccount((o) => !o)}
                    className="me-1"
                    value="Cancel"
                    color="#505050"
                    variant="outlined"
                    size="large"
                  />
                </Col>
                <Col sm="auto" className="me-sm-2 p-0">
                  {loading ? (
                    <GeneralButton
                      variant="contained"
                      disabled={true}
                      className="me-1"
                      value={
                        <img src={images.Loader} width="26px" height="26px" />
                      }
                      size="large"
                    ></GeneralButton>
                  ) : (
                    <GeneralButton
                      className="me-1"
                      value="Add"
                      variant="contained"
                      size="large"
                    />
                  )}
                </Col>
              </Row>
            </Stack>
          </Form>
        </Container>
      </div>
    </Fade>
  );
};

export default AddBankAccountInstance;
