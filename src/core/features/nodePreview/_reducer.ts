import { createReducer, getType } from "typesafe-actions";
import { PreviewState, StateType } from "./_types";
import {
  nodeContentAction,
  NodeContentActionType
} from "../../api/node/_actions";
import produce from "immer";
import { File } from "../../entities";
import { NodeContentRequestType } from "../../api/node/_types";

const initialState: StateType = {
  files: {}
};

export const nodePreviewReducer = createReducer<
  StateType,
  NodeContentActionType
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
      state.files[(action.payload as NodeContentRequestType).nodeId].state =
        PreviewState.Error;
    }
  )
});
