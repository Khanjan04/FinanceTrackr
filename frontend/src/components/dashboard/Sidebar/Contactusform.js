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
  // const emailValue = useSelector((state) => state.user.user.email);
  // const phonenumber = useSelector((state) => state.user.user.phone_number);
  const { width } = useWindowDimensions();

  const [email, setEmail] = useState("");
  // const [email, setEmail] = useState(emailValue !== "" ? emailValue : "");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState(
  //   phonenumber !== "" ? phonenumber : ""
  // );
  const [query, setQuery] = useState("");
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // const postContactUs = async () => {
  //   const args = {
  //     email: email,
  //     phonenumber: phoneNumber,
  //     query: query,
  //   };
  //   const { data, error } = await ContactUsPost(args);
  //   if (data !== null) {
  //     showSuccess(data.message);
  //     setSubmitted(false);
  //   } else {
  //     showError(error);
  //     setSubmitted(false);
  //   }
  // };
  const handleContactUsSubmit = (event) => {
    const form = event.currentTarget;
    event.stopPropagation();
    event.preventDefault();
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      setValidated(false);
      setSubmitted(true);
      // postContactUs();
    }
  };
  
  return (
    <OverlayTrigger
      trigger="click"
      rootClose
      placement="right"
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
