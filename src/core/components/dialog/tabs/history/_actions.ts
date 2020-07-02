import { NodeHistoryActionType } from "core/api/node/_actions";
import { ActionType } from "typesafe-actions";
import { createSafeAction } from "share/utils/typesafeActions";

export const historyTab__Clear = createSafeAction("@historyTab/CLEAR")();

export type HistoryTabActionTypes =
  | NodeHistoryActionType
  | ActionType<typeof historyTab__Clear>;
