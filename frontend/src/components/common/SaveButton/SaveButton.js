import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";

const SaveButton = styled(MuiButton)({
    boxShadow: "none",
    textTransform: "none",
    fontWeight: 500,
    fontSize: 16,
    fontStyle: "normal",
    padding: "10px 28px",
    lineHeight: "21px",
    color: "#5177FF",
    fontFamily: ['"DM Sans"'].join(","),
});
export const ResetButton = styled(MuiButton)({
    boxShadow: "none",
    textTransform: "none",
    fontWeight: 500,
    fontSize: 16,
    fontStyle: "normal",
    padding: "10px 28px",
    lineHeight: "21px",
    color: '#757575',
    borderColor: '#757575',
    fontFamily: ['"DM Sans"'].join(","),
});
export default SaveButton;