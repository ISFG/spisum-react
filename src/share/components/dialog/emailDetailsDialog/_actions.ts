import { DialogDataProps } from "core/components/dialog/_types";
import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";

export const dialogOpenEmailDetails = createSafeAction(
  "@dialog/OPEN_EMAIL_DETAILS"
)<DialogDataProps>();

export type DialogOpenEmailDetailsActionType = ActionType<
  typeof dialogOpenEmailDetails
>;
