import { DialogDataProps } from "core/components/dialog/_types";
import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";

export const dialogOpenHandoverBack = createSafeAction(
  "@dialog/OPEN_HANDOVER_BACK"
)<DialogDataProps>();

export type DialogOpenHandoverBackActionType = ActionType<
  typeof dialogOpenHandoverBack
>;
