import {
  CardContent,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment
} from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";
import { Field } from "formik";
import { Checkbox } from "formik-material-ui";
import styled from "styles";

export const ErrorContainer = styled("div")(() => ({
  height: 45
}));

export const ErrorIcon = styled(WarningIcon)(() => ({
  marginRight: 10
}));

export const ErrorMessage = styled("div")(() => ({
  boxOrient: "horizontal",
  color: "#f44336",
  display: "block",
  flexDirection: "row",
  fontSize: 13,
  justifyContent: "flex-start",
  marginBottom: 4,
  padding: 0,
  "svg,span": {
    verticalAlign: "middle"
  }
}));

export const FullWidthField = styled(Field)(({ theme }) => ({
  ".MuiInput-underline input": {
    background: "#F2F2F2",
    border: "1px solid #C6CDD3",
    borderRadius: 3,
    fontSize: "15px",
    height: 30,
    marginTop: 7,
    padding: " 6px 4px 6px"
  },
  ".MuiInput-underline input ::before": {
    borderBottom: "none"
  },
  ".MuiOutlinedInput-root:not(.Mui-error)": {
    "&.Mui-focused fieldset": {
      borderColor: "#ff9800"
    },
    "&:hover fieldset": {
      borderColor: "#ff9800"
    },
    fieldset: {
      borderColor: "#ff9800"
    }
  },

  caretColor: "#ff9800",

  width: "100%"
}));
export const LoginLabel = styled("label")(() => ({
  color: "#424344",
  fontFamily: "Roboto",
  fontSize: 15,
  fontWeight: 700
}));
export const ImgLogo = styled("img")(() => ({
  display: "block",
  height: 67,
  marginLeft: "auto",
  marginRight: "auto",
  maxHeight: 80,
  width: 249
}));

export const InteractiveLoginLabel = styled("div")(() => ({
  boxOrient: "horizontal",
  boxPack: "center",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center"
}));

export const LoginButton = styled("button")(() => ({
  "&.isWelcome": {
    color: "#ffffff"
  },
  "&.login-isChecking": {
    ".login-button-label": {
      color: "#00bcd4"
    },
    backgroundColor: "#e0f7fa"
  },
  "&[disabled]": {
    backgroundColor: "rgba(0,0,0,.12)",
    color: "rgba(0,0,0,.26)"
  },
  backgroundColor: "rgb(255, 152, 0)",
  border: "none",
  borderRadius: 4,
  boxShadow: "none",
  color: "#ffffff",
  cursor: "pointer",
  height: 54,
  lineHeight: "38px",
  marginTop: "1em",
  width: 312
}));

export const LoginButtonLabel = styled("span")<{}>(({ theme }) => ({
  color: "rgb(255, 255, 255)",
  fontFamily: theme.fontFamily
}));

export const LoginControls = styled(CardContent)(() => ({
  overflow: "visible",
  padding: "0 0 26px",
  width: "100%"
}));

export const LoginCheckingSpinner = styled(CircularProgress)(() => ({
  marginLeft: 15,
  marginTop: 5
}));

export const LoginField = styled("div")(() => ({
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  paddingBottom: 18
}));

export const LoginLogo = styled("div")(() => ({
  padding: "0px 16px"
}));

export const LoginRememberMe = styled(Checkbox)(() => ({
  "&.Mui-checked": {
    "&.Mui-disabled .mat-checkbox-checked": {
      backgroundColor: "rgba(0,0,0,.12)",
      color: "rgba(0,0,0,.26)"
    },
    color: "#ff9800"
  },
  color: "#ff9800",
  lineHeight: 0
}));

export const LoginRememberMeContainer = styled(FormControlLabel)<{}>(
  ({ theme }) => ({
    ".MuiFormControlLabel-label": {
      fontFamily: theme.fontFamily,
      opacity: 0.87
    },
    display: "inline-flex",
    justifyContent: "center",
    marginTop: 22,
    transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
  })
);

export const LoginRememberMeIcon = styled("span")(() => ({
  border: "2px solid #747474",
  boxSizing: "border-box",
  display: "block",
  height: 16,
  width: 16
}));

export const LoginRememberMeIconChecked = styled("span")(() => ({
  ".mat-checkbox-checkmark-path": {
    stroke: "#fafafa!important",
    strokeDasharray: 22.91026,
    strokeDashoffset: 0,
    strokeWidth: 2.13333
  },
  backgroundColor: "#ff9800",
  boxSizing: "border-box",
  height: 16,
  transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  width: 16
}));

export const VisibilityIconButton = styled(IconButton)(() => ({
  marginRight: 0
}));

export const VisibilityIconButtonIeFix = styled(InputAdornment)(() => ({
  position: "absolute",
  right: 0
}));
