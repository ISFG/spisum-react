import { GenericDocument } from "core/types";
import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";

export const dialogOpenHandoverBack = createSafeAction(
  "@dialog/OPEN_HANDOVER_BACK"
)<GenericDocument>();

export type DailogOpenHandoverBackActionType = ActionType<
  typeof dialogOpenHandoverBack
>;
