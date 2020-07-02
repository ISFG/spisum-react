import { DocumentViewType } from "core/components/documentView/_types";
import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";

export const recoverDialogOpen = createSafeAction("@dialog/RECOVER")<
  DocumentViewType[]
>();

export type recoverDialogOpenActionTypes = ActionType<typeof recoverDialogOpen>;
