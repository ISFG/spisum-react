import { DialogDataProps } from "core/components/dialog/_types";
import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";

export const evidenceCancelDialogOpen = createSafeAction(
  "@dialog/EVIDENCE_CANCEL"
)<DialogDataProps>();

export type evidenceCancelDialogOpenActionTypes = ActionType<
  typeof evidenceCancelDialogOpen
>;
