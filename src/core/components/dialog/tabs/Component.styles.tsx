import MuiTab from "@material-ui/core/Tab";
import MuiTabs from "@material-ui/core/Tabs";
import styled from "styles";

export const StyledTab = styled(MuiTab)<{}>(({ theme }) => ({
  "& > .MuiTab-wrapper": {
    alignItems: "center"
  },
  color: "#fff!important;",
  fontFamily: theme.fontFamily,
  fontSize: "15px",
  fontWeight: 700,
  textTransform: "none"
}));

export const StyledTabs = styled(MuiTabs)<{ length: number }>(
  ({ theme, length }) => ({
    "& .Mui-selected": {
      backgroundColor: "black"
    },
    "& .MuiTab-root": {
      "@media (min-width: 600px)": {
        minWidth: "105px !important"
      }
    },
    "& .MuiTabs-flexContainer": {
      marginLeft: 14
    },
    ".MuiTabs-indicator": {
      backgroundColor: "#ff9800",
      height: 4
    },

    borderBottom: "1px solid rgba(144,152,157,.6)",
    fontFamily: theme.fontFamily
  })
);

export const Bookmarks = styled("div")<{}>(({ theme }) => ({
  "& > .MuiTabs-root": {
    background: "black",
    height: 50,
    padding: "0 10px"
  }
}));
