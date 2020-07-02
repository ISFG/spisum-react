import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => {
  const tableBase = {
    "& .dialog__table-layout": {
      height: "300px"
    }
  };
  return createStyles({
    createdTable: {
      ...tableBase,
      marginTop: "60px"
    },
    returnedTable: tableBase
  });
});
