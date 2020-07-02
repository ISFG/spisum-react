import { omit, some } from "lodash";
import { getType } from "typesafe-actions";
import {
  onSetPreviewItemAction,
  onSetShowPreview,
  onTabIsLoadingAction,
  onTabIsSavingAction,
  onTabIsValidAction,
  TabAndDialogChannelActionType,
  TabAndDialogChannelAllActionType
} from "./_actions";
import { DialogReducerStateType } from "./_types";

export const initialState: DialogReducerStateType = {
  allTabsAreSaved: false,
  allTabsAreValid: false,
  anyTabIsLoading: false,
  previewItem: undefined,
  showPreview: false,
  tabs: {}
};

export const reducer = (
  state: DialogReducerStateType,
  action: TabAndDialogChannelAllActionType
): DialogReducerStateType => {
  switch (action.type) {
    case getType(onTabIsLoadingAction):
    case getType(onTabIsValidAction):
    case getType(onTabIsSavingAction):
      return updateTab(state, action);
    case getType(onSetPreviewItemAction):
      return {
        ...state,
        previewItem: action.payload.item,
        showPreview:
          typeof action.payload.showPreview === "undefined"
            ? state.showPreview
            : action.payload.showPreview
      };
    case getType(onSetShowPreview):
      return {
        ...state,
        showPreview: action.payload.showPreview
      };
    default:
      return state;
  }
};

function updateTab(
  state: DialogReducerStateType,
  action: TabAndDialogChannelActionType
): DialogReducerStateType {
  return computeState({
    ...state,
    tabs: {
      ...state.tabs,
      [action.payload.tabName]: {
        ...(state.tabs[action.payload.tabName] || {}),
        ...omit(action.payload, ["tabName"])
      }
    }
  });
}

function computeState(state: DialogReducerStateType): DialogReducerStateType {
  const tabs = Object.values(state.tabs);

  return {
    ...state,
    allTabsAreSaved: !some(tabs, { isSaved: false }),
    allTabsAreValid: !some(tabs, { isValid: false }),
    anyTabIsLoading: some(tabs, { isLoading: true })
  };
}
