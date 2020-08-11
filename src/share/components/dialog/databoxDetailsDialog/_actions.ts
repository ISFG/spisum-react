import { DialogDataProps } from "core/components/dialog/_types";
import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";

export const dialogOpenDataboxDetails = createSafeAction(
  "@dialog/OPEN_DATABOX_DETAILS"
)<DialogDataProps>();

export type DialogOpenDataboxDetailsActionType = ActionType<
  typeof dialogOpenDataboxDetails
>;
