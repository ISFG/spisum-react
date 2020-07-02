import { DocumentViewType } from "../documentView/_types";

export interface DataColumn<T> {
  getValue?: (
    item: T
  ) =>
    | string
    | boolean
    | null
    | undefined
    | number
    | Date
    | JSX.Element
    | JSX.Element[];
  isBoolean?: boolean;
  isDate?: boolean;
  keys: string[];
  sortKeys?: string[];
  label: string;
  type?: DataColumnType;
  dropdownItems?: DropdownItem[];
  getDropdownItems?: (row: T) => DropdownItem[];
}

export enum DataColumnType {
  default = "default",
  dropdown = "dropdown",
  fileSize = "fileSize",
  html = "html"
}

export interface DropdownItem {
  value?: string | string[] | number;
  text?: string;
}

export interface ControlsBarItemType<T> {
  action?: (
    selected: T[],
    refreshTable: VoidFunction,
    items?: ControlsBarItemType<DocumentViewType>[] | undefined
  ) => void;
  filter?: (source: T) => boolean;
  icon: ((selected: T[]) => JSX.Element) | JSX.Element;
  title?: ((selected: T[]) => string) | string;
  // result = null - valid, result != null - not valid
  // return "" not valid and for empty text and disabled icon effect
  validation?: (source: T[]) => string | null | Promise<string | null>;
}

export interface ControlsBarActionType<T> {
  items?: ControlsBarItemType<T>[];
  more?: ControlsBarItemType<T>[];
}

export interface ControlsBarType<T> {
  default?: ControlsBarActionType<T>;
  multi?: ControlsBarActionType<T>;
  single?: ControlsBarActionType<T>;
}

export type ValueType =
  | string
  | number
  | boolean
  | Date
  | object
  | null
  | undefined;
