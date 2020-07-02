import { createSafeAsyncAction } from "share/utils/typesafeActions";
import { ErrorType } from "types";
import { ActionType } from "typesafe-actions";

export const logoutAction = createSafeAsyncAction(
  "@logout/LOGOUT_ACTION_REQUEST",
  "@logout/LOGOUT_ACTION_SUCESS",
  "@logout/LOGOUT_ACTION_FAILURE"
)<void, void, ErrorType>();

export type LogoutActionType = ActionType<typeof logoutAction>;
