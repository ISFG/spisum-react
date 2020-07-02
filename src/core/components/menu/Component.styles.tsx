import { createStyles, makeStyles, Theme } from "@material-ui/core";
import styled, { theme } from "styles";

const top = 56;

export const ContentLayout = styled("div")(() => ({
  bottom: 0,
  display: "block",
  overflow: "hidden",
  position: "fixed",
  top,
  width: "100%"
}));

export const Main = styled("main")(() => ({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  height: "100%",
  minHeight: 0,
  overflow: "auto",
  padding: 0,
  position: "relative",
  width: "100%"
}));

export const MenuFlexLayout = styled("div")(() => ({
  display: "flex",
  flexGrow: 1
}));

export const useStyles = makeStyles((muiTheme: Theme) => {
  const appBarHeight = muiTheme.spacing(7);
  return createStyles({
    activeGroup: {
      maxWidth: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    },
    appBar: {
      backgroundColor: "#FF9600",
      boxShadow: "none",
      height: appBarHeight,
      transition: muiTheme.transitions.create(["width", "margin"], {
        duration: muiTheme.transitions.duration.leavingScreen,
        easing: muiTheme.transitions.easing.sharp
      }),
      zIndex: muiTheme.zIndex.drawer + 1
    },
    appBarShift: {
      marginLeft: theme.drawerWidth,
      transition: muiTheme.transitions.create(["width", "margin"], {
        duration: muiTheme.transitions.duration.enteringScreen,
        easing: muiTheme.transitions.easing.sharp
      })
    },
    content: {
      height: "100%",
      padding: muiTheme.spacing(3)
    },
    drawer: {
      "&  .MuiList-padding": {
        paddingBottom: "0px !important",
        paddingTop: "0px !important"
      },
      flexShrink: 0,
      whiteSpace: "nowrap",
      width: 240
    },
    drawerClose: {
      marginLeft: 0,
      overflowX: "hidden",
      transition: muiTheme.transitions.create("width", {
        duration: muiTheme.transitions.duration.leavingScreen,
        easing: muiTheme.transitions.easing.sharp
      }),
      width: 58
    },
    drawerOpen: {
      overflowX: "hidden",
      transition: muiTheme.transitions.create("width", {
        duration: muiTheme.transitions.duration.enteringScreen,
        easing: muiTheme.transitions.easing.sharp
      }),
      width: theme.drawerWidth
    },
    hide: {
      display: "none"
    },
    img: {
      height: 40,
      marginTop: 9,
      width: 147
    },
    imgLink: {
      height: appBarHeight
    },
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
    main: {
      height: "inherit"
    },
    mainDrawerClose: {
      marginLeft: muiTheme.spacing(6) + 11,
      transition: muiTheme.transitions.create("margin-left", {
        duration: muiTheme.transitions.duration.leavingScreen,
        easing: muiTheme.transitions.easing.sharp
      })
    },
    mainDrawerOpen: {
      marginLeft: theme.drawerWidth,
      transition: muiTheme.transitions.create("margin-left", {
        duration: muiTheme.transitions.duration.enteringScreen,
        easing: muiTheme.transitions.easing.sharp
      })
    },
    paper: {
      bottom: 0,
      height: "inherit",
      top: 56
    },
    title: {
      flexGrow: 1
    },
    toolbar: {
      minHeight: appBarHeight
    },
    toolbarMain: {
      ...muiTheme.mixins.toolbar,
      alignItems: "center",
      display: "flex",
      justifyContent: "flex-end",
      minHeight: appBarHeight,
      padding: muiTheme.spacing(0, 1)
    },
    userInfo: {
      "& .MuiSvgIcon-root": {
        fontSize: 42,
        marginTop: 2
      },
      "& button  .MuiSvgIcon-root": {
        fontSize: "25px !important"
      },
      alignItems: "center",
      display: "flex",
      flexWrap: "nowrap",
      justifyContent: "flex-end"
    },
    userName: {
      color: "rgba(255,255,255,.87)",
      fontSize: 16,
      fontWeight: "bold",
      maxWidth: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    },
    userNameAndGroupWrapper: {
      display: "flex",
      flexDirection: "column",
      padding: "0 0 0 15px",
      width: "160px"
    }
  });
});
