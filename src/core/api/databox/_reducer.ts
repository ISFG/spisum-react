import { getType } from "typesafe-actions";
import { databoxAccountsAction, DataboxActionType } from "./_actions";
import { DataboxStateType } from "./_types";

export const initialState: DataboxStateType = {
  databoxAccounts: [],
  error: null,
  pending: false
};

export const databoxReducer = (
  state: DataboxStateType = initialState,
  action: DataboxActionType
): DataboxStateType => {
  switch (action.type) {
    case getType(databoxAccountsAction.success):
      return {
        ...state,
        databoxAccounts: action.payload
      };

    case getType(databoxAccountsAction.failure):
      return {
        ...initialState,
        error: action.payload
      };

    default:
      return state;
  }
};
