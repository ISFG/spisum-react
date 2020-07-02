import { DataboxDocument } from "core/types";
import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";

export const dialogOpenDataboxDetails = createSafeAction(
  "@dialog/OPEN_DATABOX_DETAILS"
)<DataboxDocument>();

export type DailogOpenDataboxDetailsActionType = ActionType<
  typeof dialogOpenDataboxDetails
>;
