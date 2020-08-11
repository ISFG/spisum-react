import { NodeHistoryActionType } from "core/api/node/_actions";
import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";
import { dialogAction__Clear } from "../../_actions";
import { DialogDataProps } from "../../_types";

export type HistoryTabActionTypes =
  | NodeHistoryActionType
  | ActionType<typeof dialogAction__Clear>;

export const openFileDetailsAction = createSafeAction(
  "@file/OPEN_FILE_DETAILS_ACTION"
)<DialogDataProps>();
