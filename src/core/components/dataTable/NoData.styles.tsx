import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    noDataContainer: {
      "& > h1": {
        fontWeight: 300
      },
      alignItems: "center",
      background: "white",
      color: "#8E8E8E",
      display: "flex",
      flexFlow: "column",
      height: "100%",
      justifyContent: "center",
      width: "100%"
    },
    noDataContainerImg: {
      filter:
        "invert(56%) sepia(1%) saturate(0%) hue-rotate(268deg) brightness(99%) contrast(99%)",
      height: "auto",
      width: "80px"
    }
  })
);
