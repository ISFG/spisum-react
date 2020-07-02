import { StyledComponent } from "@emotion/styled";
import { DefaultComponentProps } from "@material-ui/core/OverridableComponent";
import { FormControlTypeMap, Theme } from "@material-ui/core";

export type FromControlComponent = StyledComponent<
  DefaultComponentProps<FormControlTypeMap<{}, "div">>,
  {},
  Theme
>;