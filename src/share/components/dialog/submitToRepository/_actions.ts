import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";
import { SubmitToRepositoryActionType } from "./_types";

export const submitToRepositoryDialogOpen = createSafeAction(
  "@dialog/SUBMIT_TO_REPOSITORY_DIALOG_OPEN"
)<SubmitToRepositoryActionType>();

export type submitToRepositoryDialogOpenActionTypes = ActionType<
  typeof submitToRepositoryDialogOpen
>;
