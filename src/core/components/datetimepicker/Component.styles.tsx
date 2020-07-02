import { DateTimePicker } from "@material-ui/pickers";
import styled from "styles";
import {
  responsiveFieldFifth,
  responsiveFieldHalf,
  responsiveFieldQuarter
} from "../dialog/Dialog.styles";

export const StyledDateTimePicker = styled(DateTimePicker)<{}>(
  () => responsiveFieldQuarter
);

export const StyledDateTimePickerFifth = styled(DateTimePicker)<{}>(
  () => responsiveFieldFifth
);

export const StyledDateTimePickerHalf = styled(DateTimePicker)<{}>(
  () => responsiveFieldHalf
);
