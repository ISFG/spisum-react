import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { StyledDivThird } from "../../../../core/components/dialog/Dialog.styles";
import styled from "../../../../styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogShipmentTable: {
      "& .dialog__table-layout--shipment": {
        height: "265px !important"
      },
      width: "100%"
    },
    priceValue: {
      "& .MuiFormHelperText-root.Mui-error": {
        bottom: "-15px !important"
      },
      "& > .MuiInput-root": {
        alignItems: "baseline"
      },
      "& input": {
        paddingBottom: "0 !important"
      },
      paddingBottom: "0 !important"
    },
    tableInfo: {
      display: "flex",
      marginTop: "15px",
      position: "relative"
    },
    tableInfoCountItem: {
      left: "25%",
      position: "absolute"
    },
    tableInfoItemError: {
      color: theme.palette.error.main,
      fontWeight: "bold"
    },
    tableInfoSizeItem: {
      left: "55%",
      position: "absolute"
    }
  })
);

export const StyledPriceField = styled(StyledDivThird)<{}>(() => ({
  "& > span": {
    marginRight: 10,
    textAlign: "right",
    width: "60%"
  },
  alignItems: "flex-end",
  display: "flex"
}));
