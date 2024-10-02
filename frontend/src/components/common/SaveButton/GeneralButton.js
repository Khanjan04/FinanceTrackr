import Button from "@mui/material/Button";
import {
  ThemeProvider,
  alpha,
  createTheme,
  getContrastRatio,
} from "@mui/material/styles";
import * as React from "react";
import { useEffect, useState } from "react";

function GeneralButton({
  variant,
  value,
  onClickEvent,
  color,
  className,
  size,
  disabled,
  title,
  startIcon,
  form,
  hidden,
  endIcon
}) {
  const [theme, setTheme] = useState();
  useEffect(() => {
    if (color) {
      const customColorBase = color;
      const customColorMain = alpha(customColorBase, 0.7);
      const themeCreated = createTheme({
        palette: {
          customColor: {
            main: customColorMain,
            light: alpha(customColorBase, 0.5),
            dark: alpha(customColorBase, 0.9),
            contrastText:
              getContrastRatio(customColorMain, "#fff") > 4.5 ? "#fff" : "#111",
          },
        },
      });
      setTheme(themeCreated);
    }
  }, [color]);

  return theme ? (
    <ThemeProvider theme={theme}>
      <Button
        className={`${className} px-3 general-button ${
          typeof value !== "string" || value.length <= 7
            ? "submit_button_width"
            : ""
        }`}
        variant={variant}
        color="customColor"
        onClick={onClickEvent}
        type={onClickEvent ? "button" : "submit"}
        size={size}
        title={title}
        disabled={disabled}
        startIcon={startIcon}
        endIcon={endIcon}
        form={form}
        hidden={hidden}
      >
        {value}
      </Button>
    </ThemeProvider>
  ) : (
    <Button
      className={`${className} px-3 general-button ${
        typeof value !== "string" || value.length <= 7
          ? "submit_button_width"
          : ""
      }`}
      variant={variant}
      color="primary"
      onClick={onClickEvent}
      type={onClickEvent ? "button" : "submit"}
      size={size}
      disabled={disabled}
      title={title}
      startIcon={startIcon}
      form={form}
      hidden={hidden}
      endIcon={endIcon}
    >
      {value}
    </Button>
  );
}
export default GeneralButton;
