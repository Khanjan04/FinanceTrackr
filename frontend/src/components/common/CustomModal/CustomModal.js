import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { height, width } from '@mui/system';
import getWindowDimensions from '../../../utils/getHeightWidth';
const CustomModal = (props) => {
  const {width} = getWindowDimensions();
  const defaultWidth = width >= 992 ? "50% !important" : "90% !important";
  const style = {
    height: "auto",
    maxHeight: `${props.maxHeight ? props.maxHeight : "90%"}`,
    minHeight: `${props.height ? props.height : "auto"}`,
    overflow: "auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: `${props.width ? props.width + "!important" : defaultWidth}`,
    bgcolor: props.bgcolor ? props.bgcolor : "background.paper",
    border: "2px solid #FFFFFF",
    boxShadow: 24,
    padding: `${props.padding ? props.padding : '1.3rem !important'}`,

    outline: "none",
  }
  return (
    <>
      <Modal open={props.open} disableEscapeKeyDown={false} onClose={props.handleClose}>
        <Box sx={style} className={`rounded w-auto ${props.customHeight ? props.customHeight : ""}`}>
          {props.children}
        </Box>
      </Modal>
    </>
  )
}

export default CustomModal
