import { getType } from "typesafe-actions";
import { shipmentHistoryAction } from "../../../../api/shipment/_action";
import {
  HistoryShipmentTabActionTypes,
  historyShipmentTab__Clear
} from "./_actions";
import { ShipmentHistoryStateType } from "./_types";

const initialState: ShipmentHistoryStateType = {
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
