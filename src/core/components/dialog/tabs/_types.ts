import { DialogContentPropsType, DialogTabContentPropsType } from "../_types";

export interface TabPropsType {
  content: (props: DialogTabContentPropsType) => JSX.Element;
  label: string;
  filter?: (prop: DialogContentPropsType) => boolean;
}
