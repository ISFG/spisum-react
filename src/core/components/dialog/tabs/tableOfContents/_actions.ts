import { NodeHistoryActionType } from "core/api/node/_actions";
import { ActionType } from "typesafe-actions";
import { createSafeAction } from "../../../../../share/utils/typesafeActions";
import { GenericDocument } from "../../../../types";
import { dialogAction__Clear } from "../../_actions";

export type HistoryTabActionTypes =
  | NodeHistoryActionType
  | ActionType<typeof dialogAction__Clear>;

export const openFileDetailsAction = createSafeAction(
  "@file/OPEN_FILE_DETAILS_ACTION"
)<GenericDocument & { readonly?: boolean }>();
