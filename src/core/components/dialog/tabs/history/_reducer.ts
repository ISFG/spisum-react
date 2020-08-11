import { nodeHistoryAction } from "core/api/node/_actions";
import { getType } from "typesafe-actions";
import { HistoryTabActionTypes, historyTab__Clear } from "./_actions";
import { NodeHistoryStateType } from "./_types";

const initialState: NodeHistoryStateType = {
  error: null,
  isLoading: false,
  list: {
    entries: undefined,
    pagination: {
      count: 0,
      hasMoreItems: false,
      maxItems: 50,
      skipCount: 0,
      totalItems: 0
    }
  }
};

export const historyReducer = (
  state: NodeHistoryStateType = initialState,
  action: HistoryTabActionTypes
): NodeHistoryStateType => {
  switch (action.type) {
    case getType(nodeHistoryAction.request):
      return {
        ...state,
        isLoading: true
      };
    case getType(nodeHistoryAction.success):
      return {
        ...state,
        isLoading: false,
        list: action.payload.list
      };
    case getType(nodeHistoryAction.failure):
      return {
        ...state,
        error: action.payload.message,
        isLoading: false
      };
    case getType(historyTab__Clear):
      return initialState;

    default:
      return state;
  }
};
