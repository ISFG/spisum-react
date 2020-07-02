import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    hidden: {
      display: "none"
    },
    pagination: {
      "& > div": { width: "100%" },
      background: "#fff",
      borderTop: "1px solid #B6BBBE",
      bottom: "0",
      left: "0",
      position: "absolute",
      right: "0"
    },
    table: {
      minWidth: "600px"
    }
  });
});
