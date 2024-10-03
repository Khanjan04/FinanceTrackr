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
import { addBankAccount, editBankAccount } from "../../../api/bankAccount";

const EditBankAccountInstance = ({
  getBankAccountList,
  setOpenEditBankAccount,
  setBankAccountInstance,
  bankAccountInstance,
}) => {
  const [bank, setBank] = useState(bankAccountInstance.bank);
  const [displayName, setDisplayName] = useState(bankAccountInstance.displayName);
  const [ifsCode, setIFSCode] = useState(bankAccountInstance.ifscode);
  const [accountNo, setAccountNo] = useState(bankAccountInstance.accountNo);
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

  const editBankAccountFormHandler = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      setLoading(true);

      const { data, error } = await editBankAccount({
        id: bankAccountInstance.id,
        updatedInstance: {
          ...(bank !== "" && { bank: bank }),
          ...(accountNo !== "" && { accountNo: accountNo }),
          ...(displayName !== "" && { displayName: displayName }),
          ...(ifsCode !== "" && { ifscode: ifsCode }),
        },
      });
      if (data !== null) {
        showSuccess(data);
        setLoading(false);
        setOpenEditBankAccount((o) => !o);
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
            <h3 className="main_content_heading">Edit Bank Account</h3>
            <CrossButton
              onClick={() => setOpenEditBankAccount((o) => !o)}
            ></CrossButton>
          </div>
          <Form
            noValidate
            validated={validated}
            onSubmit={editBankAccountFormHandler}
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
                  Amount <span className="text-danger">*</span>
                </Form.Label>
                <Col md={9}>
                  <Form.Control
                    required
                    className="form_input_field"
                    type="number"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    placeholder="Amount"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter an amount.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3 justify-content-between"
                controlId="formPlaintextAssetType"
              >
                <Form.Label column md={3} className="input_label">
                  Description <span className="text-danger">*</span>
                </Form.Label>
                <Col md={9}>
                  <Form.Control
                    required
                    className="form_input_field"
                    type="text"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Description"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a description.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Row className="pt-9 mb-1 justify-content-end">
                <Col sm="auto">
                  <GeneralButton
                    onClickEvent={() => setOpenEditBankAccount((o) => !o)}
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
                      value="Update"
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

export default EditBankAccountInstance;
