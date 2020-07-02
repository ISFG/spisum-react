import { createSafeAsyncAction } from "share/utils/typesafeActions";
import { ErrorType } from "../../../types";
import { ReasonFormRequestType } from "./_types";

export const documentSaveReasonFormActionType = createSafeAsyncAction(
  "@document/SAVE_REASON_FORM",
  "@document/SAVE_REASON_FORM_SUCCESS",
  "@document/SAVE_REASON_FORM_FAILURE"
)<ReasonFormRequestType, void, ErrorType>();
