import { DocumentViewType } from "core/components/documentView/_types";
import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";

export const lostDestroyedDialogOpen = createSafeAction(
  "@dialog/EVIDENCE_LOST_DESTROYED"
)<DocumentViewType>();

export type lostDestroyedDialogOpenActionTypes = ActionType<
  typeof lostDestroyedDialogOpen
>;
