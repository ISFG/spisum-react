import { DialogDataType } from "core/components/dialog/_types";
import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";

export const dialogOpenConceptDetails = createSafeAction(
  "@dialog/OPEN_CONCEPT_DETAILS"
)<DialogDataType>();

export type DialogOpenConceptDetailsActionType = ActionType<
  typeof dialogOpenConceptDetails
>;
