import { GenericDocument } from "core/types";
import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";

export const dialogOpenIncomplete = createSafeAction(
  "@dialog/OPEN_INCOMPLETE_DIALOG"
)<GenericDocument>();

export type DailogOpenIncompleteActionType = ActionType<
  typeof dialogOpenIncomplete
>;
