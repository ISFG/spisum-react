import {
  tableOfContentsAction,
  TableOfContentsActionType
} from "core/api/node/_actions";
import { createReducer } from "typesafe-actions";
import { TableOfContentsStateType } from "./_types";

const initialState: TableOfContentsStateType = {
  entities: [],
  loading: false,
  pagination: {
    count: 0,
    hasMoreItems: false,
    maxItems: 50,
    skipCount: 0,
    totalItems: 0
  }
};

export const tableOfContentsReducer = createReducer<
  TableOfContentsStateType,
  TableOfContentsActionType
>(initialState)
  .handleAction(tableOfContentsAction.request, (state, action) => {
    return {
      ...state,
      loading: true
    };
  })
  .handleAction(tableOfContentsAction.success, (state, action) => {
    return {
      ...state,
      ...action.payload,
      loading: false
    };
  })
  .handleAction(tableOfContentsAction.failure, (state, action) => {
    return {
      ...state,
      loading: false
    };
  });
