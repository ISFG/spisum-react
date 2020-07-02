import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";

export const automaticLogoutDialogCloseAction = createSafeAction(
  "@automaticLogoutDialog/CLOSE"
)();

export const automaticLogoutDialogOpenAction = createSafeAction(
  "@automaticLogoutDialog/OPEN"
)<number | null>();

export type AutomaticLogoutDialogActionType = ActionType<
  | typeof automaticLogoutDialogCloseAction
  | typeof automaticLogoutDialogOpenAction
>;
