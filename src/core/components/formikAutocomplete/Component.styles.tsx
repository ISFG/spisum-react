import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette }: Theme) => {
  return createStyles({
    autocompleteFieldWrapper: {
      position: "relative"
    },
    loader: {
      bottom: "30px",
      position: "absolute",
      right: "25px"
    }
  });
});
