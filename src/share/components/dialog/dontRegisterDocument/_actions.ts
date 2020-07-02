import { GenericDocument } from "core/types";
import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";

export const dialogOpenDontRegister = createSafeAction(
  "@dialog/OPEN_DONT_REDISTER"
)<GenericDocument>();

export type DailogOpenDontRegisterActionType = ActionType<
  typeof dialogOpenDontRegister
>;
