import produce from "immer";
import { getType } from "typesafe-actions";
import { documentCreateActionType } from "../../api/document/_actions";
import {
  MetaFormActionType,
  metaFormAction__Clear,
  metaFormAction__Destroy,
  metaFormAction__Update
} from "./_actions";
import { DocumentStateType, MetaFormStateType } from "./_types";

const initialDocumentState = {
  destroy: false,
  documentId: undefined,
  formValues: undefined,
  isLoading: true,
  isLocked: false
};

const initialState: MetaFormStateType = {
  actual: initialDocumentState,
  previous: []
};

export default (
  state: MetaFormStateType = initialState,
  action: MetaFormActionType
) => {
  switch (action.type) {
    case getType(metaFormAction__Update): {
      const document = {
        ...state.actual,
        ...action.payload,
        isLoading: false
      };

      if (
        state.actual.documentId &&
        state.actual.documentId !== document.documentId
      ) {
        return {
          actual: document,
          previous: [state.actual, ...state.previous]
        };
      }

      return {
        ...state,
        actual: document
      };
    }

    case getType(metaFormAction__Clear):
      return produce(state, (draft) => {
        if (draft.previous.length) {
          draft.actual = draft.previous.shift() as DocumentStateType;
          return;
        }

        draft.actual = initialDocumentState;
      });

    case getType(metaFormAction__Destroy):
    case getType(documentCreateActionType.failure):
      return produce(state, (draft) => {
        draft.actual = {
          ...initialDocumentState,
          destroy: true
        };
      });

    default:
      return state;
  }
};
