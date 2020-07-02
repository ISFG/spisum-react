import {
  componentViewShipmentAction,
  ComponentViewShipmentActionType,
  componentViewShipmentUpdateAction
} from "core/api/components/_actions";
import { getType } from "typesafe-actions";
import { ComponentsTabStateType } from "./_types";

const initialState: ComponentsTabStateType = {
  components: {
    entities: []
  },
  error: null,
  isLoading: false,
  selected: {
    entities: []
  }
};

export const componentShipmentReducer = (
  state: ComponentsTabStateType = initialState,
  action: ComponentViewShipmentActionType
): ComponentsTabStateType => {
  switch (action.type) {
    case getType(componentViewShipmentAction.request):
      return {
        ...state,
        error: null,
        isLoading: true
      };

    case getType(componentViewShipmentAction.success):
      return {
        components: action.payload.components,
        error: null,
        isLoading: false,
        selected: action.payload.selected
      };

    case getType(componentViewShipmentAction.failure):
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case getType(componentViewShipmentUpdateAction):
      return {
        ...state,
        selected: {
          entities: action.payload
        }
      };

    default:
      return state;
  }
};
