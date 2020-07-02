import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    display: "flex"
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  }
}));
