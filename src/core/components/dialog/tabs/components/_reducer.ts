import {
  componentCreateAction,
  componentDeleteAction,
  componentUpdateAction,
  componentViewAction,
  ComponentViewActionType
} from "core/api/components/_actions";
import { getType } from "typesafe-actions";
import { File } from "../../../../entities";
import { ComponentsTabStateType } from "./_types";

const initialState: ComponentsTabStateType = {
  components: {
    entities: []
  },
  error: null,
  isLoading: false
};

export default (
  state: ComponentsTabStateType = initialState,
  action: ComponentViewActionType
): ComponentsTabStateType => {
  switch (action.type) {
    case getType(componentViewAction.request):
      return {
        ...state,
        error: null,
        isLoading: true
      };

    case getType(componentViewAction.success):
      return {
        components: action.payload,
        error: null,
        isLoading: false
      };

    case getType(componentViewAction.failure):
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case getType(componentCreateAction.success):
    case getType(componentCreateAction.failure):
      return {
        ...state,
        isLoading: false
      };

    case getType(componentDeleteAction.request):
      return {
        ...state,
        isLoading: true
      };

    case getType(componentDeleteAction.success):
    case getType(componentDeleteAction.failure):
      return {
        ...state,
        isLoading: false
      };

    case getType(componentUpdateAction.request):
      return {
        ...state,
        components: {
          ...state.components,
          // optimistic ui update
          entities: replaceEntity(state.components.entities, action.payload)
        }
      };

    default:
      return state;
  }
};

function replaceEntity(entities: File[], entity: File) {
  return entities.map((originalEntity) =>
    originalEntity.id === entity.id ? entity : originalEntity
  );
}
