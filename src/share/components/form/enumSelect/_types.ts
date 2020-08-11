import {
  DeliveryMode,
  DocumentState,
  SendModeValues,
  SettleMethod
} from "enums";

// add more supported EnumTypes here
export type EnumType =
  | typeof SettleMethod
  | typeof DocumentState
  | typeof DeliveryMode
  | typeof SendModeValues;

export interface Translations {
  [key: string]: string;
}
