import { nodeVersionAction } from "core/api/node/_actions";
import { getType } from "typesafe-actions";
import { dialogAction__Clear } from "../../_actions";
import { VersionTabActionTypes } from "./_actions";
import { NodeVersionStateType } from "./_types";

const initialState: NodeVersionStateType = {
  error: null,
  isLoading: false,
  list: {
    entries: [],
    pagination: {
      count: 0,
      hasMoreItems: false,
      maxItems: 25,
      skipCount: 0,
      totalItems: 0
    }
  }
};

export const versionReducer = (
  state: NodeVersionStateType = initialState,
  action: VersionTabActionTypes
): NodeVersionStateType => {
  switch (action.type) {
    case getType(nodeVersionAction.request):
      return {
        ...state,
        isLoading: true
      };
    case getType(nodeVersionAction.success):
      return {
        ...state,
        isLoading: false,
        list: action.payload.list
      };
    case getType(nodeVersionAction.failure):
      return {
        ...state,
        error: action.payload.message,
        isLoading: false
      };
    case getType(dialogAction__Clear):
      return initialState;

    default:
      return state;
  }
};
