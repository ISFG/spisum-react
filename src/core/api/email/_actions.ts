import { createSafeAsyncAction } from "share/utils/typesafeActions";
import { ErrorType } from "types";
import { ActionType } from "typesafe-actions";
import {
  EmailAccount,
  EmailDonRegisterRequestType,
  EmailIncompleteRequestType
} from "./_types";

export const emailAccountsAction = createSafeAsyncAction(
  "@email/EMAIL_ACCOUNTS_REQUEST",
  "@email/EMAIL_ACCOUNTS_SUCCESS",
  "@email/EMAIL_ACCOUNTS_FAILURE"
)<void, EmailAccount[], ErrorType>();

export const emailDontRegisterActionType = createSafeAsyncAction(
  "@email/DONT_REGISTER_ACTION_REQUEST",
  "@email/DONT_REGISTER_ACTION_SUCESS",
  "@email/DONT_REGISTER_ACTION_FAILURE"
)<EmailDonRegisterRequestType, void, ErrorType>();

export const emailIncompleteActionType = createSafeAsyncAction(
  "@email/INCOMPLETE_ACTION_REQUEST",
  "@email/INCOMPLETE_ACTION_SUCESS",
  "@email/INCOMPLETE_ACTION_FAILURE"
)<EmailIncompleteRequestType, void, ErrorType>();

export type DontRegisterActionTypes = ActionType<
  typeof emailDontRegisterActionType | typeof emailIncompleteActionType
>;

export type EmailActionType = ActionType<
  | typeof emailDontRegisterActionType
  | typeof emailIncompleteActionType
  | typeof emailAccountsAction
>;
