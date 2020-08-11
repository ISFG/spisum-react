import { keyframes } from "@emotion/core";
import {
  Breadcrumbs,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import styled, { theme } from "styles";

const paginationHeight = 55;
const headerHeight = 95;
const labelsHeight = 55;

export const Wrapper = styled(Grid)(() => ({ position: "relative" }));

export const ActionBarContainer = styled(Grid)(() => ({
  background: "#fff",
  padding: "30px 6px 10px 20px"
}));

export const ActionBarWrapper = styled(Grid)(() => ({
  alignContent: "center",
  justifyContent: "flex-end"
}));

export const ActionBarSection = styled(Grid)(() => ({}));

export const PopoverDialog = styled(Paper)(() => ({
  padding: "12px 12px 12px 0",
  zIndex: 9
}));

const spin = keyframes({
  "100%": {
    transform: "rotate(360deg)"
  }
});

export const AnimatedRefreshRotate = styled(Refresh)(() => ({
  animation: `${spin} 2s linear infinite`
}));

export const ActionBarItemElement = styled(Grid)<{
  cursor?: string;
  color?: string;
  fill?: string;
}>(({ color, cursor = "pointer", fill = "#131D1E" }) => ({
  "& svg": {
    fill
  },
  ...(color && { color }),
  cursor,
  marginLeft: "12px"
}));

export const Path = styled(Breadcrumbs)(() => ({
  "& p": { color: theme.colors.gray },
  color: theme.colors.gray
}));

export const Title = styled(Typography)(() => ({
  color: theme.colors.orange,
  fontWeight: 600
}));

export const PaperLayout = styled(Paper)(() => ({
  background: "none",
  borderRadius: "0",
  boxShadow: "none"
}));

export const TableContainerLayout = styled("div")(() => ({
  "@media all and (-ms-high-contrast: none)": {
    display: "none"
  },
  flexGrow: 1
}));

export const ExpandedItem = styled("div")(() => ({
  padding: "4px",
  svg: {
    display: "inline-block",
    fill: "rgba(0, 0, 0, 0.54)",
    verticalAlign: "middle"
  }
}));

export const useStyles = makeStyles(() => {
  return createStyles({
    checkboxDisabled: {
      color: "rgba(0, 0, 0, 0.25)"
    },
    container: {
      overflow: "visible"
    },
    date: { whiteSpace: "nowrap" },
    footerText: {
      alignItems: "center",
      display: "flex",
      fontSize: "0.875rem",
      paddingLeft: "15px"
    },
    height: {
      background: "#F0F1F3",
      display: "flex",
      height: `calc(100vh - ${headerHeight}px - ${paginationHeight}px - ${labelsHeight}px)`,
      overflow: "auto"
    },
    pagination: {
      "& .MuiSelect-icon": {
        top: "auto"
      },
      "& .MuiSelect-select": {
        fontSize: "0.875rem",
        paddingBottom: "4px"
      },
      "& > div": {
        width: "100%"
      },
      background: "#fff",
      borderTop: "1px solid #B6BBBE",
      bottom: "0",
      left: theme.drawerWidth,
      position: "fixed",
      right: "0"
    },
    rowDisabled: {
      cursor: "not-allowed",
      opacity: 0.25
    },
    table: {
      emptyCells: "show",
      width: "100%"
    },
    tableHead: {
      "& th": { left: "auto", whiteSpace: "nowrap" }
    },
    tbody: {
      "& tr": {
        "&:last-child": { border: 0 },
        borderBottom: "1px solid #C6CDD3"
      },
      background: "#fff",
      border: "1px solid #C6CDD3",
      boxSizing: "border-box",
      cursor: "pointer"
    }
  });
});
