import { KeyboardTimePicker } from "@material-ui/pickers";
import styled from "styles";
import { responsiveFieldQuarter } from "../dialog/Dialog.styles";

export const StyledKeyboardTimePicker = styled(KeyboardTimePicker)<{}>(
  () => responsiveFieldQuarter
);
