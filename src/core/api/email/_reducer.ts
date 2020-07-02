import { getType } from "typesafe-actions";
import { emailAccountsAction, EmailActionType } from "./_actions";
import { EmailStateType } from "./_types";

export const initialState: EmailStateType = {
  emailAccounts: [],
  error: null,
  pending: false
};

export const emailReducer = (
  state: EmailStateType = initialState,
  action: EmailActionType
): EmailStateType => {
  switch (action.type) {
    case getType(emailAccountsAction.success):
      return {
        ...state,
        emailAccounts: action.payload
      };

    case getType(emailAccountsAction.failure):
      return {
        ...initialState,
        error: action.payload
      };

    default:
      return state;
  }
};
