import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() =>
  createStyles({
    layout: {
      height: "58vh",
      overflow: "auto"
    },
    pagination: {
      background: "#fff",
      borderTop: "1px solid #B6BBBE",
      bottom: "0",
      position: "sticky",
      width: "100%"
    }
  })
);
