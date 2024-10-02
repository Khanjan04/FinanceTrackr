import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
const LiveSessionModal = (props) => {
    const style = {
        maxHeight: "100%",
        overflow: "scroll",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: `${props.width ? props.width : "90% !important"}`,
        height:"90%",
        bgcolor: "background.paper",
        border: "2px solid #FFFFFF",
        boxShadow: 24,
        p: 4,
        outline: "none"
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

export default LiveSessionModal
