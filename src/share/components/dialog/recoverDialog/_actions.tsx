import { GenericDocument } from "core/types";
import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";

export const recoverDialogOpen = createSafeAction("@dialog/RECOVER")<
  GenericDocument[]
>();

export type recoverDialogOpenActionTypes = ActionType<typeof recoverDialogOpen>;
