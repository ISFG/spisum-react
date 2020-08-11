import { DialogDataProps } from "core/components/dialog/_types";
import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";

export const dialogOpenConceptDetails = createSafeAction(
  "@dialog/OPEN_CONCEPT_DETAILS"
)<DialogDataProps>();

export type DialogOpenConceptDetailsActionType = ActionType<
  typeof dialogOpenConceptDetails
>;
