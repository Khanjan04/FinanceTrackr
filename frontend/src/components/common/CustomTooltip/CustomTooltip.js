import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Image from "../../../utils/images";

export const LightTooltip = styled(({ className, placement = 'right', ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} placement={placement} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "#FF0000",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export const DarkTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} placement="right" />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.grey,
    color: "#FFFFFF",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));
export const PasswordLightToolTip = (props) => {
    return(
    < LightTooltip
  title = {props.title}
  {...props}
    >
    <img
      src={Image.passwordInfoIcon}
      alt="info"
      width="20"
      height="20"
      className="mx-2 cursor_pointer"
    />
    </LightTooltip>);
}

export const SettingDarkToolTip = (props)=>{
  return(
    <DarkTooltip title={props.title} {...props}>
      <img
      src={Image.settingInfoIcon}
      alt="info"
      width="20"
      height="20"
      className="mx-2 cursor_pointer"
    />
    </DarkTooltip>
  );
}
export default LightTooltip;
