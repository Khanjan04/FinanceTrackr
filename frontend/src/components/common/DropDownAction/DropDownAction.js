import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import React from 'react';

const DropDownAction = ({ actionOptions, tabValue, setTabValue }) => {
    const BootstrapInputBorderRadius = styled(InputBase)(({ theme }) => ({
        "label + &": {
            marginTop: theme.spacing(3),
        },
        "& .MuiInputBase-input": {
            position: "relative",
            backgroundColor: theme.palette.background.paper,
            border: "1px solid #ced4da",
            borderRadius: "4px",
            fontSize: 16,
            fontWeight: 700,
            lineHeight: "21px",
            fontStyle: "normal",
            padding: "10px 26px",
            transition: theme.transitions.create(["border-color", "box-shadow"]),
            fontFamily: ['"DM Sans"'].join(","),
            "&:focus": {
                borderRadius: 4,
                borderColor: "#80bdff",
                boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
            },
        },
    }));

    return (
        <>
            <FormControl variant="standard" sx={{ my: 1 }}>
                <Select
                    labelId="select-label"
                    id="select_action"
                    className='select_action_class'
                    value={tabValue}
                    onChange={(event) => setTabValue(event.target.value)}
                    input={<BootstrapInputBorderRadius />}>
                    {actionOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value} className="select_options">{option.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}

export default DropDownAction;