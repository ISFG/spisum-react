import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";

export const evidenceCreateConceptDialogOpen = createSafeAction(
  "@dialog/EVIDENCE_CREATE_CONCEPT"
)();

export type evidenceCreateConceptDialogOpenActionTypes = ActionType<
  typeof evidenceCreateConceptDialogOpen
>;
