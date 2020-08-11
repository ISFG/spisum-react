import { DialogType } from "core/components/dialog/_types";
import { DocumentType, SitePaths, SpisumNodeTypes } from "enums";
import {
  createSafeAction,
  createSafeAsyncAction
} from "share/utils/typesafeActions";
import { ErrorType } from "types";
import { ActionType } from "typesafe-actions";
import { IncomeDocumentType, RefreshStatusPayload } from "./types";

export const documentRegisterAction = createSafeAction("@document/REGISTER")<{
  dialogType: DialogType;
  document: IncomeDocumentType;
  documentType?: DocumentType;
  sitePath?: SitePaths;
  nodeType: SpisumNodeTypes;
  onSuccess?: VoidFunction;
}>();

export const documentRegisterSuccess = createSafeAction(
  "@document/REGISTER_SUCCESS"
)();

export const documentRegisterSuccessGiven = createSafeAction(
  "@document/REGISTER_SUCCESS_GIVEN"
)();

export const documentRegisterFailure = createSafeAction(
  "@document/REGISTER_FAILURE"
)();

export const documentRefreshAction = createSafeAsyncAction(
  "@document/REFRESH_DOCUMENT_REQUEST",
  "@document/REFRESH_DOCUMENT_SUCESS",
  "@document/REFRESH_DOCUMENT_FAILURE"
)<
  {
    refreshAction:
      | typeof documentEmailRefreshAction
      | typeof documentDataBoxRefreshAction;
    statusAction:
      | typeof documentEmailRefreshStatusAction
      | typeof documentDataBoxRefreshStatusAction;
  },
  RefreshStatusPayload,
  ErrorType
>();

export const documentEmailRefreshAction = createSafeAsyncAction(
  "@document/REFRESH_EMAIL_REQUEST",
  "@document/REFRESH_EMAIL_SUCESS",
  "@document/REFRESH_EMAIL_FAILURE"
)<void, number, ErrorType>();

export const documentDataBoxRefreshAction = createSafeAsyncAction(
  "@document/REFRESH_DATABOX_REQUEST",
  "@document/REFRESH_DATABOX_SUCESS",
  "@document/REFRESH_DATABOX_FAILURE"
)<void, number, ErrorType>();

export const documentEmailRefreshStatusAction = createSafeAsyncAction(
  "@document/REFRESH_EMAIL_STATTUS_REQUEST",
  "@document/REFRESH_EMAIL_STATTUS_SUCESS",
  "@document/REFRESH_EMAIL_STATTUS_FAILURE"
)<number, RefreshStatusPayload, ErrorType>();

export const documentDataBoxRefreshStatusAction = createSafeAsyncAction(
  "@document/REFRESH_DATABOX_STATUS_REQUEST",
  "@document/REFRESH_DATABOX_STATUS_SUCESS",
  "@document/REFRESH_DATABOX_STATUS_FAILURE"
)<number, RefreshStatusPayload, ErrorType>();

export const documentRegisterFailureGiven = createSafeAction(
  "@document/REGISTER_FAILURE_GIVEN"
)();

export type documentRegisterActionTypes =
  | ActionType<typeof documentRegisterAction>
  | ActionType<typeof documentRegisterSuccess>
  | ActionType<typeof documentRegisterSuccessGiven>
  | ActionType<typeof documentRegisterFailure>
  | ActionType<typeof documentRegisterFailureGiven>;
