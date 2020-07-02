import { DocumentViewType } from "core/components/documentView/_types";
import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";

export const evidenceCancelDialogOpen = createSafeAction(
  "@dialog/EVIDENCE_CANCEL"
)<DocumentViewType>();

export type evidenceCancelDialogOpenActionTypes = ActionType<
  typeof evidenceCancelDialogOpen
>;
