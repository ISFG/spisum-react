import { CircularProgress } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import styled from "styles";

export const LoadingImage = styled(CircularProgress)(() => ({
  border: "none",
  color: "#4caf50",
  zIndex: 1
}));

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      "& > div": { position: "absolute!important" as "absolute" },
      alignItems: "center",
      display: "flex",
      height: "100%",
      justifyContent: "center",
      padding: theme.spacing(1),
      position: "absolute!important" as "absolute"
    }
  })
);
