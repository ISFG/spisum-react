import {
  KeyboardDatePicker,
  KeyboardDateTimePicker
} from "@material-ui/pickers";
import styled from "styles";
import {
  responsiveFieldFifth,
  responsiveFieldQuarter
} from "../dialog/Dialog.styles";

export const StyledKeyboardDatePicker = styled(KeyboardDatePicker)<{}>(
  () => responsiveFieldQuarter
);

export const StyledKeyboardDatePickerFifth = styled(KeyboardDatePicker)<{}>(
  () => responsiveFieldFifth
);

export const StyledKeyboardDateTimePickerFifth = styled(
  KeyboardDateTimePicker
)<{}>(() => responsiveFieldFifth);
