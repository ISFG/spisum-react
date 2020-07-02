import { LOCATION_CHANGE } from "connected-react-router";
import { getType } from "typesafe-actions";
import {
  documentViewAction,
  DocumentViewActionType,
  documentViewAction__Clear,
  documentViewAction__Refresh,
  documentViewAction__RemoveItem,
  documentViewAction__SetSelected,
  documentViewAction__UpdateIsFavorite,
  documentViewAction__UpdateItem
} from "./_actions";
import { DocumentViewStateType } from "./_types";

const initialState: DocumentViewStateType = {
  error: null,
  items: [],
  itemsCount: 0,
  pageNumber: 0,
  pending: false,
  selected: [],
  shouldRefreshTable: null,
  sortAsc: null,
  sortColumnIndex: null,
  sortKeys: null,
  source: null
};

export default (
  state: DocumentViewStateType = initialState,
  action: DocumentViewActionType
): DocumentViewStateType => {
  switch (action.type) {
    case LOCATION_CHANGE: {
      return {
        ...state,
        selected: [],
        pageNumber: 0
      };
    }
    case getType(documentViewAction.request):
      return {
        ...state,
        error: null,
        maxItems: action.payload.maxItems,
        pageNumber: action.payload.pageNumber,
        pending: true,
        sortAsc:
          action.payload.sortAsc ||
          (action.payload.sortAsc === false ? false : null),
        sortColumnIndex:
          action.payload.sortColumnIndex !== undefined
            ? action.payload.sortColumnIndex
            : null,
        sortKeys: action.payload.sortKeys || null
      };

    case getType(documentViewAction.success):
      return {
        ...state,
        error: null,
        items:
          (action.payload.list &&
            action.payload.list.entries &&
            action.payload.list.entries.map((x) => x.entry)) ||
          [],
        itemsCount:
          (action.payload.list &&
            action.payload.list.pagination &&
            action.payload.list.pagination.totalItems) ||
          0,
        pending: false,
        source: action.payload.list.source
      };

    case getType(documentViewAction.failure):
      return {
        ...state,
        error: action.payload,
        pending: false
      };

    case getType(documentViewAction__RemoveItem):
      return {
        ...state,
        error: null,
        items: state.items.filter((item) => item?.id !== action.payload.id),
        itemsCount: state.itemsCount - 1,
        pending: false
      };
    case getType(documentViewAction__UpdateItem): {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.entry.id
      );
      const items =
        index < 0
          ? state.items
          : [
              ...state.items.slice(0, index),
              action.payload.entry,
              ...state.items.slice(index + 1, state.items.length)
            ];

      return {
        ...state,
        items
      };
    }
    case getType(documentViewAction__UpdateIsFavorite): {
      const { ids, isFavorite } = action.payload;

      const items = state.items.map((item) => {
        if (ids.includes(item.id)) {
          return {
            ...item,
            isFavorite
          };
        }
        return item;
      });

      return {
        ...state,
        items
      };
    }
    case getType(documentViewAction__Refresh):
      return {
        ...state,
        shouldRefreshTable: action.payload
      };

    case getType(documentViewAction__SetSelected):
      return {
        ...state,
        selected: action.payload
      };

    case getType(documentViewAction__Clear):
      return initialState;

    default:
      return state;
  }
};
