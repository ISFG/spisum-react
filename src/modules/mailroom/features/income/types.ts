import {
  AnalogDocument,
  DataboxDocument,
  EmailDocument,
  GenericDocument
} from "core/types";

export interface RefreshStatusPayload {
  running: boolean;
  newMessageCount: string;
}

export type IncomeDocumentType =
  | AnalogDocument
  | EmailDocument
  | DataboxDocument
  | GenericDocument;
