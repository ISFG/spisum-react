import { getType } from "typesafe-actions";
import {
  AutomaticLogoutDialogActionType,
  automaticLogoutDialogCloseAction,
  automaticLogoutDialogOpenAction
} from "./_actions";
import { AutomaticLogoutDialogStateType } from "./_types";

const initialState: AutomaticLogoutDialogStateType = {
  logoutInterval: null
};

export default (
  state: AutomaticLogoutDialogStateType = initialState,
  action: AutomaticLogoutDialogActionType
): AutomaticLogoutDialogStateType => {
  switch (action.type) {
    case getType(automaticLogoutDialogCloseAction):
      return {
        logoutInterval: null
      };

    case getType(automaticLogoutDialogOpenAction):
      return {
        logoutInterval: action.payload
      };

    default:
      return state;
  }
};
