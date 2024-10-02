import React from 'react';
import images from '../../../utils/images';
import { Tooltip } from '@mui/material';
import { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material";

const CustomTooltip = ({ message, placement }) => {
    return (
        <>
            <Tooltip title={message} placement={placement} className='mx-2'>
                <img
                    src={images.InfoIcon}
                    alt="info"
                    width="15"
                    height="15"
                    className=" cursor_pointer" />
            </Tooltip>
        </>
    )
}

export default CustomTooltip;



export const HoverTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
     borderRadius:0,
     border: '1px solid #bbb',
      fontSize: 11,
      padding: '8px',
    },
  }));