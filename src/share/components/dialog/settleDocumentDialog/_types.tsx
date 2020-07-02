import { SslProperties } from "core/api/models";

export type SettleDocumentFormValues = Pick<
  SslProperties,
  | "customSettleMethod"
  | "settleDate"
  | "settleTime"
  | "settleMethod"
  | "settleReason"
>;
