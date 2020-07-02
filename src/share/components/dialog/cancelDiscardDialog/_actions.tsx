import { DocumentViewType } from "core/components/documentView/_types";
import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";

export const discardCancelDialogOpen = createSafeAction(
  "@dialog/DISCARD_CANCEL_OPEN"
)<DocumentViewType>();

export type discardCancelDialogOpenActionTypes = ActionType<
  typeof discardCancelDialogOpen
>;
