import {
  shipmentsAction,
  ShipmentsCreatedActionType
} from "core/api/node/_actions";
import { createReducer } from "typesafe-actions";
import { ShipmentsStateType } from "./_types";

const initialState: ShipmentsStateType = {
  components: {
    entities: [],
    loading: false,
    pagination: {
      count: 0,
      hasMoreItems: false,
      maxItems: 25,
      skipCount: 0,
      totalItems: 0
    }
  },
  created: {
    entities: [],
    loading: false,
    pagination: {
      count: 0,
      hasMoreItems: false,
      maxItems: 25,
      skipCount: 0,
      totalItems: 0
    }
  },
  returned: {
    entities: [],
    loading: false,
    pagination: {
      count: 0,
      hasMoreItems: false,
      maxItems: 25,
      skipCount: 0,
      totalItems: 0
    }
  }
};

export const shipmentsReducer = createReducer<
  ShipmentsStateType,
  ShipmentsCreatedActionType
>(initialState)
  .handleAction(shipmentsAction.request, (state, action) => {
    const assocType = action.payload.assocType;
    return {
      ...state,
      [assocType]: {
        ...state[assocType],
        loading: true
      }
    };
  })
  .handleAction(shipmentsAction.success, (state, action) => {
    return {
      ...state,
      ...action.payload
    };
  });
