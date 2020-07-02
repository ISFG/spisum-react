import {
  createStyles,
  ListItem,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Theme
} from "@material-ui/core";
import styled from "styles";
import isfgPowered from "../../../assets/icons/isfgPowered.svg";

export const ListItemTextWithoutWidth = styled(ListItemText, {
  shouldForwardProp: (prop) => !["level"].includes(prop)
})<{
  level: number;
}>(({ level }) => ({
  "& > .MuiTypography-body1": {
    fontSize: 15,
    fontWeight: 700,
    marginLeft: 8,
    paddingLeft: level > 1 ? level * 10 + 35 : level * 45,
    verticalAlign: "sub"
  },
  "& > li": {
    background: "#FF9600 !important"
  },
  marginBottom: 3,
  marginTop: 0,
  minWidth: "auto"
}));
// border-bottom: 2px solid rgba(255,255,255,.06);
//     width: 168px;
//     margin-left: 52px;
export const ListItemWithPadding = styled(ListItem)<{
  padding: number;
}>(({ padding }) => ({
  "&:hover": {},
  lineHeight: "30px !important",
  maxHeight: "48px !important",
  paddingLeft: 1,
  paddingRight: 1
}));

export const ListMenu = styled(Menu)<{ margin: number }>(({ margin }) => ({
  ...((margin && { marginLeft: margin }) || {})
}));

export const MenuItemStyled = styled(MenuItem)(() => ({
  alignItems: "center",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row",
  height: "inherit",
  padding: "0 16px",
  position: "relative"
}));

export const useStyles = makeStyles((muiTheme: Theme) =>
  createStyles({
    active: {
      "& .MuiTypography-body1": {
        margin: 8,
        textAlign: "center",
        width: 100
      },
      background: "#FF9600 !important",
      borderRadius: 2,
      color: "#FFFFFF",
      fontFamily: "Roboto",
      height: 38,
      letterSpacing: 0,
      textAlign: "left"
    },
    closeMainMenu: {
      background: "#FF9600 !important",
      color: "#FFFFFF"
    },
    closeMenuItem: {
      top: 20
    },
    collapse: {
      "& .MuiListItem-root": {
        maxHeight: "36px !important"
      },
      backgroundColor: "#141E1E !important",
      color: "#EFF2F5",
      fontFamily: "Roboto",
      fontSize: 15,
      letterSpacing: 0,
      textAlign: "left"
    },
    hide: {
      display: "none"
    },
    listItemIcon: {
      "& > svg": {
        fontSize: 25
      },
      color: "#c6cacd",
      height: 30,
      marginLeft: 14,
      minWidth: 25,
      paddingRight: 10,
      width: 28
    },
    mainMenu: {
      backgroundColor: "#141E1E !important",
      color: "#FFFFFF"
    },
    mainSubMenu: {
      backgroundColor: "#313939"
    },
    menu: {
      left: 0,
      marginTop: 0
    },

    subMenu: {
      "& .MuiDivider-root": {
        borderBottom: "1px solid rgba(255,255,255,.06) ",
        marginLeft: 52,
        width: 168
      },
      "& .MuiTypography-body1": {
        fontSize: "14px !important",
        fontWeight: "400 !important",
        maxHeight: "36px !important"
      },
      color: "#EFF2F5 !important",
      fontFamily: "none",
      letterSpacing: 0,

      textAlign: "left"
    },
    treeSubMenu: {
      "& .MuiTypography-body1": {
        fontSize: "14px !important",
        fontWeight: "400 !important",
        maxHeight: "36px !important"
      },
      backgroundColor: "#313939",
      color: "#FFFFFF !important",
      fontFamily: "Roboto",
      letterSpacing: 0,

      textAlign: "left"
    },
    treeSubMenuParent: {
      "& .MuiTypography-body1": {
        fontSize: "14px !important",
        fontWeight: "700 !important"
      },
      "&:hover": {
        backgroundColor: "#313939"
      },
      backgroundColor: "#313939",
      color: "#FFFFFF"
    }
  })
);

export const PoweredByISFG = styled("div")<{}>(() => ({
  background: `url(${isfgPowered}) center center no-repeat`,
  backgroundSize: "contain",
  bottom: "15px",
  height: "23px",
  position: "absolute",
  width: "100%"
}));
