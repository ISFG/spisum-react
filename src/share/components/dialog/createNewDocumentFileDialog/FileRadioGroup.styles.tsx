import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useLocalStyles = makeStyles(() =>
  createStyles({
    inputAutocomplete: {
      marginBottom: "10px",
      marginLeft: "20px"
    },
    radioGroupWrapper: {
      width: "100%"
    }
  })
);
