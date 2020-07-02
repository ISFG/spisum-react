import { getType } from "typesafe-actions";
import {
  historyShipmentTab__Clear,
  HistoryShipmentTabActionTypes
} from "./_actions";
import { ShipmentHistoryStateType } from "./_types";
import { shipmentHistoryAction } from "../../../../api/shipment/_action";

const initialState: ShipmentHistoryStateType = {
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

export const historyShipmentReducer = (
  state: ShipmentHistoryStateType = initialState,
  action: HistoryShipmentTabActionTypes
): ShipmentHistoryStateType => {
  switch (action.type) {
    case getType(shipmentHistoryAction.request):
      return {
        ...state,
        isLoading: true
      };
    case getType(shipmentHistoryAction.success):
      return {
        ...state,
        isLoading: false,
        list: action.payload.list
      };
    case getType(shipmentHistoryAction.failure):
      return {
        ...state,
        error: action.payload.message,
        isLoading: false
      };
    case getType(historyShipmentTab__Clear):
      return initialState;

    default:
      return state;
  }
};
