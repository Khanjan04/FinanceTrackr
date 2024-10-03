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
import { addIncome, editIncome } from "../../../api/income";

const EditIncomeInstance = ({
  getIncomeList,
  setOpenEditIncome,
  setIncomeInstance,
  incomeInstance,
}) => {
  const income_types = [
    { value: "miniorange", label: "miniOrange" },
    { value: "freelance", label: "Freelance" },
    { value: "dad", label: "Dad" },
    { value: "invts_sold", label: "Invts Sold" },
    { value: "refund", label: "Refund" },
  ];
  
  const [date, setDate] = useState("");
  const [type, setType] = useState(income_types[incomeInstance.type]);
  const [amount, setAmount] = useState(incomeInstance.amount);
  const [description, setDescription] = useState(incomeInstance.description);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [slideChecked, setSlideChecked] = useState(false);

  useEffect(() => {
    setSlideChecked(true);
    const now = new Date(incomeInstance.date * 1000);
    let date =
      now.getFullYear() +
      "-" +
      (now.getMonth() < 9 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1) +
      "-" +
      (now.getDate() < 9 ? "0" + now.getDate() : now.getDate());

    setDate(date);
  }, []);

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

  const editIncomeFormHandler = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      setLoading(true);
      let finalDate;
      finalDate = new Date(date);
      setDate(finalDate);

      const { data, error } = await editIncome({
        id: incomeInstance.id,
        updatedInstance : {
          ...(date !== "" && { date: Date.parse(finalDate) / 1000 }),
          ...(type !== "" && { type: type }),
          ...(amount !== "" && { amount: amount }),
          ...(description !== "" && { description: description }),
        },
      });
      if (data !== null) {
        showSuccess(data);
        setLoading(false);
        setOpenEditIncome((o) => !o);
        setIncomeInstance(new Object());
      }
      if (error !== null) {
        showError(error);
        setLoading(false);
      }
      getIncomeList();
    }
  };

  return (
    <Fade timeout={fadedelayTime} in={slideChecked}>
      <div>
        <Container fluid className="main_content_container mx-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h3 className="main_content_heading">Edit Income</h3>
            <CrossButton
              onClick={() => setOpenEditIncome((o) => !o)}
            ></CrossButton>
          </div>
          <Form
            noValidate
            validated={validated}
            onSubmit={editIncomeFormHandler}
            className="add_asset_form"
          >
            <Stack gap={1}>
              <Form.Group
                as={Row}
                className="mb-3 justify-content-between"
                controlId="formPlaintextName"
              >
                <Form.Label column md={3} className="input_label">
                  Date <span className="text-danger">*</span>
                </Form.Label>
                <Col md={9}>
                  <div className="col-md-12 col-lg-10 col-sm-6 row">
                    <Form.Group className="col-md-6 col-sm-12">
                      <Form.Control
                        required
                        type="date"
                        value={date}
                        min={date}
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </div>
                  <Form.Control.Feedback type="invalid">
                    Please enter a start from time.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3 justify-content-between"
                controlId="formPlaintextAssetType"
              >
                <Form.Label column md={3} className="input_label">
                  Type <span className="text-danger">*</span>
                </Form.Label>
                <Col md={9}>
                  <Select
                    value={income_types[incomeInstance.type]}
                    name="asset_type"
                    required={true}
                    options={income_types}
                    onChange={(selectedOption) => setType(selectedOption.value)}
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
                    onClickEvent={() => setOpenEditIncome((o) => !o)}
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

export default EditIncomeInstance;
