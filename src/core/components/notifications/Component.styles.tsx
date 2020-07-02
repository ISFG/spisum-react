import styled from "styles";

export const NotificationLayout = styled("div")(() => ({
  ".MuiSnackbar-root:not(:last-child)": {
    marginBottom: 15
  },
  bottom: 0,
  position: "absolute",
  right: 0
}));
