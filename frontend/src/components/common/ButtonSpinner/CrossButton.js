import React from "react";
import "react-initials-avatar/lib/ReactInitialsAvatar.css";
import "react-tabs/style/react-tabs.css";
import { Button } from "react-bootstrap";
import images from "../../../utils/images";

const CrossButton = ({ onClick }) => {
  return (
    <>
      <Button
        variant="light"
        className="cursor_pointer m-1 p-1 circle-wrapper"
        onClick={onClick}
      >
        <img src={images.CrossIcon} alt="x" />
      </Button>
    </>
  );
};
export default CrossButton;
