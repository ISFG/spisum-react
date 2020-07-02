import { Card } from "@material-ui/core";
import backgroundImage from "assets/images/background.png";
import styled from "styles";

export const Ie11FixerChild = styled("div")(() => ({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%"
}));

export const Ie11FixerParent = styled("div")(() => ({
  "@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)": {
    display: "table-cell",
    paddingTop: 16,
    verticalAlign: "middle",
    width: "100%"
  },
  minWidth: 320
}));

export const Login = styled("div")(() => ({
  boxDirection: "normal",
  boxOrient: "vertical",
  display: "flex",
  flex: 1,
  flexDirection: "column",
  height: "80%",
  minHeight: 0
}));

export const LoginCardWide = styled(Card)(() => ({
  "@media (max-width: 482px)": {
    padding: "15px",
    width: "calc(100% - 32px)"
  },
  backgroundColor: "#fff",
  borderRadius: 8,
  boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12)",
  boxSizing: "border-box",
  height: 540,
  minWidth: 320,
  padding: "21px 64px 34px",
  width: 438
}));

export const LoginContent = styled("div")(() => ({
  "@media all and (-ms-high-contrast:none),(-ms-high-contrast:active)": {
    display: "table",
    height: "auto",
    minWidth: 996
  },
  "@media screen and (max-height: 600px)": {
    minHeight: "auto"
  },
  backgroundImage: `url(${backgroundImage})`,
  backgroundPosition: "center",
  backgroundPositionY: "calc(50% + 23px)",
  backgroundRepeat: "no-repeat",
  backgroundSize: " 1014px 661px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "100%",
  minWidth: 320
}));
