import { getType } from "typesafe-actions";
import {
  closeModalLoadingAction,
  LayoutActionType,
  openModalLoadingAction
} from "./_actions";
import { LayoutStateType } from "./_types";

const initialState: LayoutStateType = {
  loading: false
};

export default (
  state: LayoutStateType = initialState,
  action: LayoutActionType
): LayoutStateType => {
  switch (action.type) {
    case getType(closeModalLoadingAction):
      return {
        loading: false
      };

    case getType(openModalLoadingAction):
      return {
        loading: true
      };

    default:
      return state;
  }
};
