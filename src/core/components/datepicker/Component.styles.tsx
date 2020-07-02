import { makeStyles, Theme } from "@material-ui/core/styles";
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import styled from "styles";
import {
  responsiveFieldFifth,
  responsiveFieldQuarter
} from "../dialog/Dialog.styles";

export const useStyles = makeStyles(({ palette }: Theme) => ({
  noDatepickerIcon: {
    "& .MuiButtonBase-root.MuiIconButton-root.Mui-disabled": {
      display: "none"
    }
  }
}));

export const StyledKeyboardDatePicker = styled(KeyboardDatePicker)<{}>(
  () => responsiveFieldQuarter
);

export const StyledKeyboardDatePickerFifth = styled(KeyboardDatePicker)<{}>(
  () => responsiveFieldFifth
);

export const StyledDatePicker = styled(DatePicker)<{}>(
  () => responsiveFieldQuarter
);

export const StyledDatepickerFifth = styled(DatePicker)<{}>(
  () => responsiveFieldFifth
);
