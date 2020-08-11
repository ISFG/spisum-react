import { getType } from "typesafe-actions";
import {
  DialogActionType,
  dialogAction__Clear,
  dialogOpenAction
} from "./_actions";
import { DialogStateType } from "./_types";
const initialState: DialogStateType = {
  dialogProps: {},
  dialogType: null
};

export default (
  state: DialogStateType = initialState,
  action: DialogActionType
): DialogStateType => {
  switch (action.type) {
    case getType(dialogOpenAction):
      return {
        dialogProps: action.payload.dialogProps,
        dialogType: action.payload.dialogType
      };

    case getType(dialogAction__Clear):
      return initialState;

    default:
      return state;
  }
};
