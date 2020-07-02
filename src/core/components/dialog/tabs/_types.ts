import { DialogContentPropsType } from "../_types";

export interface TabPropsType {
  content: (props: DialogContentPropsType) => JSX.Element;
  label: string;
  filter?: (prop: DialogContentPropsType) => boolean;
}
