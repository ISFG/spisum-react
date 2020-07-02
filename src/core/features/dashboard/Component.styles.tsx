import manual from "assets/icons/manual.svg";
import support from "assets/icons/support.svg";
import youtube from "assets/icons/youtube.svg";
import styled from "../../../styles";

export const DashboardBody = styled("div")<{}>(() => ({
  background: "black",
  borderTopLeftRadius: "80px",
  borderTopRightRadius: "80px",
  bottom: "0",
  boxShadow: "0px 0px 30px 2px rgba(61,61,61,1)",
  height: "90%",
  position: "absolute",
  width: "70%"
}));

export const DashboardWrapper = styled("div")<{}>(() => ({
  display: "flex",
  height: "calc(100vh - 56px)",
  justifyContent: "center",
  position: "relative",
  width: "100vw - 250px"
}));

const filter =
  "invert(58%) sepia(55%) saturate(2079%) hue-rotate(360deg) brightness(103%) contrast(105%)";
const iconBase = {
  "&:hover": {
    filter
  },
  backgroundSize: "cover",
  cursor: "pointer",
  height: "100px",
  margin: "10px 15px",
  width: "100px"
};

export const IconBox = styled("div")<{}>(() => ({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  fontSize: "1.125rem",
  fontWeight: "bold",
  justifyContent: "center"
}));

export const Manual = styled("div")<{}>(() => ({
  background: `url(${manual}) center center no-repeat`,
  ...iconBase
}));

export const Support = styled("div")<{}>(() => ({
  background: `url(${support}) center center no-repeat`,
  ...iconBase
}));

export const Youtube = styled("div")<{}>(() => ({
  background: `url(${youtube}) center center no-repeat`,
  ...iconBase
}));

export const TextBox = styled("div")<{}>(({ theme }) => ({
  "& > p": {
    color: theme.colors.black,
    margin: "0",
    textAlign: "center"
  },
  "& > p.colored": {
    color: theme.colors.orange,
    fontWeight: "bold"
  },
  color: theme.colors.white,
  fontSize: "2.75rem",
  fontWeight: "normal",
  zIndex: 2
}));

export const Divider = styled("div")<{}>(({ theme }) => ({
  background: "rgba(0, 0, 0, 0.5)",
  height: "1px",
  margin: "50px 0 40px 0",
  width: "100%"
}));

export const Box = styled("div")<{}>(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between"
}));

export const Wrapper = styled("div")<{}>(() => ({
  margin: "80px auto",
  maxWidth: "800px",
  padding: "0 20px"
}));
