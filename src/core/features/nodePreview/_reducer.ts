import { ActionType, createReducer, getType } from "typesafe-actions";
import { PreviewState, StateType } from "./_types";
import {
  nodeContentAction,
  NodeContentActionType
} from "../../api/node/_actions";
import produce from "immer";
import { File } from "../../entities";
import { NodeContentRequestType } from "../../api/node/_types";
import { componentCreateAction } from "../../api/components/_actions";
import { componentCreateAction as conceptComponentCreateAction } from "../../api/concept/components/_actions";

const initialState: StateType = {
  files: {}
};

type ComponentCreateActionType = ActionType<
  | typeof componentCreateAction.success
  | typeof conceptComponentCreateAction.success
>;

export const nodePreviewReducer = createReducer<
  StateType,
  NodeContentActionType | ComponentCreateActionType
>(initialState, {
  [getType(nodeContentAction.request)]: produce(
    (state: StateType, action: NodeContentActionType) => {
      state.files[(action.payload as NodeContentRequestType).nodeId] = {
        state: PreviewState.Downloading
      };
    }
  ),
  [getType(nodeContentAction.success)]: produce(
    (state: StateType, action: NodeContentActionType) => {
      state.files[(action.payload as File).id] = {
        file: action.payload as File,
        state: PreviewState.Success
      };
    }
  ),
  [getType(nodeContentAction.failure)]: produce(
    (state: StateType, action: NodeContentActionType) => {
      const { nodeId } = action.payload as NodeContentRequestType;

      if (!state.files[nodeId]) {
        state.files[nodeId] = {
          state: PreviewState.Error
        };

        return;
      }

      state.files[nodeId]!.state = PreviewState.Error;
    }
  ),
  // we want to clear downloaded file when a new version is uploaded
  [getType(componentCreateAction.success)]: produce(
    (state: StateType, action: ComponentCreateActionType) => {
      const { componentId } = action.payload;

      if (!componentId) {
        return;
      }

      state.files[componentId] = undefined;
    }
  ),
  // we want to clear downloaded file when a new version is uploaded
  [getType(conceptComponentCreateAction.success)]: produce(
    (state: StateType, action: ComponentCreateActionType) => {
      const { componentId } = action.payload;

      if (!componentId) {
        return;
      }

      state.files[componentId] = undefined;
    }
  )
});
