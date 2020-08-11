import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";
import { ChannelPreviewItemType, DialogDataProps, DialogType } from "./_types";

export const dialogOpenAction = createSafeAction("@dialog/OPEN")<{
  dialogType: DialogType;
  dialogProps: DialogDataProps;
  refreshTable?: VoidFunction;
}>();

export const dialogAction__Clear = createSafeAction("@dialog/CLEAR")();

export const onTabIsLoadingAction = createSafeAction("onTabIsLoading")<{
  tabName: string;
  isLoading: boolean;
}>();
export const onTabIsSavedAction = createSafeAction("onTabIsSaved")<{
  tabName: string;
  isSaved: boolean;
}>();
export const onTabIsSavingAction = createSafeAction("onTabIsSaving")<{
  tabName: string;
  isSaving: boolean;
}>();
export const onTabIsValidAction = createSafeAction("onTabIsValid")<{
  tabName: string;
  isValid: boolean;
}>();
export const onSetPreviewItemAction = createSafeAction("onSetPreviewItem")<{
  tabName: string;
  item: ChannelPreviewItemType;
  showPreview?: boolean;
}>();
export const onSetShowPreview = createSafeAction("onSetShowPreview")<{
  showPreview: boolean;
}>();

export type DialogActionType = ActionType<
  typeof dialogOpenAction | typeof dialogAction__Clear
>;

export type TabAndDialogChannelGlobalActionType = ActionType<
  typeof onSetShowPreview
>;

export type TabAndDialogChannelActionType = ActionType<
  | typeof onTabIsLoadingAction
  | typeof onTabIsSavedAction
  | typeof onTabIsSavingAction
  | typeof onTabIsValidAction
  | typeof onSetPreviewItemAction
>;

export type TabAndDialogChannelAllActionType =
  | TabAndDialogChannelGlobalActionType
  | TabAndDialogChannelActionType;
