import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";

export const closeModalLoadingAction = createSafeAction(
  "@modalLoading/CLOSE"
)();

export const openModalLoadingAction = createSafeAction("@modalLoading/OPEN")();

export type LayoutActionType = ActionType<
  typeof closeModalLoadingAction | typeof openModalLoadingAction
>;
