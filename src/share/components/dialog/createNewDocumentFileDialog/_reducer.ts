import { createReducer } from "typesafe-actions";
import {
  clearResultsAction,
  searchFilesAction,
  SearchFilesActionType
} from "./_actions";
import { SearchFilesState } from "./_types";

const initialState: SearchFilesState = {
  isLoading: false,
  results: undefined
};

export const searchFilesReducer = createReducer<
  SearchFilesState,
  SearchFilesActionType
>(initialState)
  .handleAction(searchFilesAction.request, (state) => {
    return {
      ...state,
      isLoading: true
    };
  })
  .handleAction(searchFilesAction.success, (state, action) => {
    return {
      ...state,
      isLoading: false,
      results: action.payload
    };
  })
  .handleAction([searchFilesAction.failure, clearResultsAction], () => {
    return initialState;
  });
