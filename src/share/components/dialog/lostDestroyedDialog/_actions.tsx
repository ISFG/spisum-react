import { DialogDataProps } from "core/components/dialog/_types";
import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";

export const lostDestroyedDialogOpen = createSafeAction(
  "@dialog/EVIDENCE_LOST_DESTROYED"
)<DialogDataProps>();

export type lostDestroyedDialogOpenActionTypes = ActionType<
  typeof lostDestroyedDialogOpen
>;
