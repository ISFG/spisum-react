import { createReducer, getType } from "typesafe-actions";
import { produce } from "immer";
import {
  uploadFailureAction,
  uploadFileAction,
  UploadFileActionType,
  uploadProgressAction,
  uploadSuccessAction
} from "./_actions";
import { StateType, UploadProgress, UploadState } from "./_types";

const initialState: StateType = {
  uploads: {}
};

export const fileUploadReducer = createReducer<StateType, UploadFileActionType>(
  initialState,
  {
    [getType(uploadFileAction)]: produce(
      (state: StateType, action: UploadFileActionType) => {
        state.uploads[action.payload.file.name] = {
          progress: 0,
          state: UploadState.Running
        };
      }
    ),
    [getType(uploadProgressAction)]: produce(
      (state: StateType, action: UploadFileActionType) => {
        getUpload(
          state,
          action
        ).progress = (action.payload as UploadProgress).progress;
      }
    ),
    [getType(uploadFailureAction)]: produce(
      (state: StateType, action: UploadFileActionType) => {
        getUpload(state, action).state = UploadState.Error;
      }
    ),
    [getType(uploadSuccessAction)]: produce(
      (state: StateType, action: UploadFileActionType) => {
        getUpload(state, action).state = UploadState.Success;
      }
    )
  }
);

const getUpload = (state: StateType, action: UploadFileActionType) => {
  if (!state.uploads[action.payload.file.name]) {
    state.uploads[action.payload.file.name] = {
      state: UploadState.Running
    };
  }

  return state.uploads[action.payload.file.name];
};
