import { createStyles, makeStyles, Theme } from "@material-ui/core";
import styled, { theme } from "styles";

export const useStyles = makeStyles((muiTheme: Theme) => {
  return createStyles({
    inputInput: {
      padding: muiTheme.spacing(1, 1, 1, 7),
      transition: muiTheme.transitions.create("width"),
      [muiTheme.breakpoints.up("sm")]: {
        "&:focus": {
          width: 200
        },
        width: 120
      },
      width: "100%"
    },
    inputRoot: {
      color: "inherit"
    },
    search: {
      "&:hover": {
        backgroundColor: "#FFD9A2"
      },
      backgroundColor: "#FFD9A2",
      borderRadius: 18,
      height: 36,
      marginLeft: 0,
      marginRight: 7,
      position: "relative",
      width: 177,
      [muiTheme.breakpoints.up("sm")]: {
        marginLeft: muiTheme.spacing(1),
        width: "auto"
      }
    },
    searchIcon: {
      alignItems: "center",
      color: "#ff9600",
      display: "flex",
      height: "100%",
      justifyContent: "center",
      pointerEvents: "none",
      position: "absolute",
      width: muiTheme.spacing(7)
    }
  });
});
