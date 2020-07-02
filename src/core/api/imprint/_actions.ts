import { ImprintRequestType } from "./_types";
import { createSafeAsyncAction } from "../../../share/utils/typesafeActions";
import { ErrorType } from "../../../types";

export const getImprintAction = createSafeAsyncAction(
  "@imprint/GET_IMPRINT_ACTION_REQUEST",
  "@imprint/GET_IMPRINT_ACTION_SUCCESS",
  "@imprint/GET_IMPRINT_ACTION_FAILURE"
)<ImprintRequestType, void, ErrorType>();
