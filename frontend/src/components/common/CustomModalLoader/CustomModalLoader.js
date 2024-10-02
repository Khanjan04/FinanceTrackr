import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
const CustomLoaderModal = (props) => {
  const style = {
    maxHeight: "90%",
    overflow: "scroll",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: `${props.width ? props.width : "50% !important"}`,
    bgcolor: "background.paper",
    p: 4,
    outline: "none",
    backgroundColor: "none",
    border: "none",
    display: "inline-table",
    boxShadow: "none"
  }
  return (
    <>
      <Modal open={props.open} onClose={props.handleClose}>
        <Box sx={style} className="rounded w-auto">
          {props.children}
        </Box>
      </Modal>
    </>
  )
}

export default CustomLoaderModal;
