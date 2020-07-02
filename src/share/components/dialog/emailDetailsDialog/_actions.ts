import { DialogDataType } from "core/components/dialog/_types";
import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";

export const dialogOpenEmailDetails = createSafeAction(
  "@dialog/OPEN_EMAIL_DETAILS"
)<DialogDataType>();

export type DailogOpenEmailDetailsActionType = ActionType<
  typeof dialogOpenEmailDetails
>;
