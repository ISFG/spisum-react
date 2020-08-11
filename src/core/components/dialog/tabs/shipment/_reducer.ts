import { getType } from "typesafe-actions";
import { dialogAction__Clear } from "../../_actions";
import { nodeShipmentAction, ShipmentTabActionTypes } from "./_actions";
import { NodeShipmentStateType } from "./_types";

const initialState: NodeShipmentStateType = {
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

export const shipmentTabReducer = (
  state: NodeShipmentStateType = initialState,
  action: ShipmentTabActionTypes
): NodeShipmentStateType => {
  switch (action.type) {
    case getType(nodeShipmentAction.request):
      return {
        ...state,
        isLoading: true
      };
    case getType(nodeShipmentAction.success):
      return {
        ...state,
        isLoading: false,
        list: action.payload.list
      };
    case getType(nodeShipmentAction.failure):
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
