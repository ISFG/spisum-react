import { createStyles, makeStyles, Theme } from "@material-ui/core";
import error from "assets/images/error.svg";
import styled from "../../../styles";

export const ErrorPic = styled("div")<{}>(() => ({
  background: `url(${error}) center center no-repeat`,
  backgroundSize: "contain",
  height: 400,
  width: 400
}));

export const ErrorBoundaryContainer = styled("div")<{}>(() => ({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center",
  width: "100%"
}));

export const useStyles = makeStyles((muiTheme: Theme) => {
  return createStyles({
    centeredError: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  });
});
