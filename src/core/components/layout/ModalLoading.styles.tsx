import { CircularProgress } from "@material-ui/core";
import styled from "styles";

export const LoadingLayout = styled("div")(() => ({
  left: "50%",
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)"
}));

export const LoadingImage = styled(CircularProgress)(() => ({
  border: "none",
  color: "#4caf50",
  zIndex: 1
}));
