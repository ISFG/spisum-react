import { DialogDataProps } from "core/components/dialog/_types";
import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";

export const submitToRepositoryDialogOpen = createSafeAction(
  "@dialog/SUBMIT_TO_REPOSITORY_DIALOG_OPEN"
)<DialogDataProps>();

export type submitToRepositoryDialogOpenActionTypes = ActionType<
  typeof submitToRepositoryDialogOpen
>;
