import { FormHelperText } from "@material-ui/core";
import styled from "styles";

export const StyledEditorDiv = styled("div")<{}>(() => ({
  display: "flex",
  flexBasis: "100%",
  flexDirection: "column"
}));

export const StyledWarningHelperText = styled(FormHelperText)<{}>(() => ({
  color: "#f44336"
}));
