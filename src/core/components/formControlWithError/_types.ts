import { StyledComponent } from "@emotion/styled";
import { FormControlTypeMap } from "@material-ui/core";
import { DefaultComponentProps } from "@material-ui/core/OverridableComponent";
import { ITheme } from "styles";

export type FormControlComponent = StyledComponent<
  DefaultComponentProps<FormControlTypeMap<{}, "div">>,
  {},
  ITheme
>;
