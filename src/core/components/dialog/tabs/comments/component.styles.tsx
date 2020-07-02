import muiTextareaAutosize from "@material-ui/core/TextareaAutosize";
import styled from "styles";
export const StyledAvatarContainer = styled("div")(() => ({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  paddingRight: "15px"
}));
export const StyledButtonContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "row-reverse"
}));
export const StyledCommentContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  flexGrow: 1
}));
export const StyledCommentsContainer = styled("div")(() => ({
  // margin: "0 -30px"
}));
export const StyledCommentsChildContainer = styled("div")(() => ({
  paddingBottom: "15px"
}));
export const StyledCommentChildContainer = styled(StyledCommentsChildContainer)(
  () => ({
    maxHeight: "calc(80vh - 340px) !important",
    overflow: "auto"
  })
);
export const StyledCommentSpan = styled("span")(() => ({
  fontSize: "12px"
}));
export const StyledTextArea = styled(muiTextareaAutosize)(() => ({
  "&:focus": {
    borderBottom: "1px solid #F79804"
  },
  borderLeft: "none",
  borderRight: "none",
  borderTop: "none",
  outline: "none",
  width: "100%"
}));
