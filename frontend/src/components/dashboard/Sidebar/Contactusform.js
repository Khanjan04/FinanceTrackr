import { Button, Card, Col, Form, OverlayTrigger, Row } from "react-bootstrap";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useSelector } from "react-redux";

import Popover from "react-bootstrap/Popover";
import "./Sidebar.scss";
import useWindowDimensions from "../../../utils/getHeightWidth";
import { useState } from "react";
import images from "../../../utils/images";
// import { ContactUsPost } from "../../../api/contact_us";
import { showError, showSuccess } from "../../../utils/showMessage";
import "../../common/css/common.scss";

export const ContactUsForm = () => {
  const emailValue = useState();
  const phonenumber = useState();
  const { width } = useWindowDimensions();

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [query, setQuery] = useState("");
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const postContactUs = async () => {
    const args = {
      email: email,
      phonenumber: phoneNumber,
      query: query,
    };
    const { data, error } = await ContactUsPost(args);
    if (data !== null) {
      showSuccess(data.message);
      setSubmitted(false);
    } else {
      showError(error);
      setSubmitted(false);
    }
  };
  const handleContactUsSubmit = (event) => {
    const form = event.currentTarget;
    event.stopPropagation();
    event.preventDefault();
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      setValidated(false);
      setSubmitted(true);
      postContactUs();
    }
  };
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header
        as="h3"
        className="border-0 bg-white py-3 pam-fontFamily bg-popover"
      >
        <Row>
          <Col className="contactus-heading">Need Help ? </Col>
          <Col className="text-end">
            <img
              className="cursor_pointer"
              src={images.ContactUs}
              onClick={() => document.body.click()}
            />
          </Col>
        </Row>
      </Popover.Header>
      <Popover.Body className="pt-1 pam-fontFamily">
        <Form
          id="side-pop"
          noValidate
          validated={validated}
          onSubmit={handleContactUsSubmit}
        >
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="pop-form contactus-label">
              Email
              <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your email"
              value={email}
              pattern="^\S+@\S+\.\S+$"
              className="user_input_field contactus-input"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid Email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label className="pop-form contactus-label">
              Phone Number
            </Form.Label>
            <Form.Control
              placeholder="Enter your number"
              value={phoneNumber}
              pattern="^(\+\d{1,3}[\s]?)?([\s]?\d{10,12})$"
              className="user_input_field contactus-input"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid phone number. Phone number length allowed is
              12. Country code length allowed is 3. Add + before country code.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicquery">
            <Form.Label className="pop-form contactus-label">
              Query Type
              <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              rows={5}
              className="user_input_field contactus-input contactus-query"
              required
              placeholder="Enter your query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid Query.
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="secondary w-100 bg-button fs-14 py-2 mt-2"
            type="submit"
            disabled={submitted ? true : false}
          >
            {!submitted && "Contact Us"}
            {submitted && (
              <img src={images.ContactUsLoader} width="20px" height="20px" />
            )}
          </Button>
        </Form>
      </Popover.Body>
    </Popover>
  );
  
  return (
    <OverlayTrigger
      trigger="click"
      rootClose
      placement="right"
      overlay={popover}
    >
      <div className={"contact-div position-absolute contact-button-responsive"}>
        <div className="cls1">
          <Card
            border="secondary"
            className=" px-0 bg-card card-border ff-poppins card-sidebar"
          >
            <Card.Body>
              <Button className="d-flex px-2 btn btn-light button-border text-align-center border-0 bg-white ">
                <AiFillQuestionCircle size="20" className="bg-darkGrey" />
              </Button>
              <Card.Title className=" pt-2 mb-0 text-white fs-16px">
                Need Help?
              </Card.Title>
              <Card.Text className="text-white fs-14px">
                Getting stuck somewhere!
              </Card.Text>
              <div className="d-flex justify-content-center">
                <Button className="py-2 btn btn-light  text-uppercase text-button border-0 bg-white w-100">
                  contact us
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="cls2">
          <Button className="py-2 bg-button border-0 ff-poppins w-100">
            Contact Us
          </Button>
        </div>
      </div>
    </OverlayTrigger>
  );
};
