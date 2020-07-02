import { createSafeAsyncAction } from "share/utils/typesafeActions";
import { ErrorType } from "types";
import { ActionType } from "typesafe-actions";
import { DataboxAccount, DataboxDonRegisterRequestType } from "./_types";

export const databoxAccountsAction = createSafeAsyncAction(
  "@databox/DATABOX_ACCOUNTS_REQUEST",
  "@databox/DATABOX_ACCOUNTS_SUCCESS",
  "@databox/DATABOX_ACCOUNTS_FAILURE"
)<void, DataboxAccount[], ErrorType>();

export const databoxDontRegisterActionType = createSafeAsyncAction(
  "@databox/DONT_REGISTER_ACTION_REQUEST",
  "@databox/DONT_REGISTER_ACTION_SUCESS",
  "@databox/DONT_REGISTER_ACTION_FAILURE"
)<DataboxDonRegisterRequestType, void, ErrorType>();

export type DataboxActionType = ActionType<
  typeof databoxDontRegisterActionType | typeof databoxAccountsAction
>;
