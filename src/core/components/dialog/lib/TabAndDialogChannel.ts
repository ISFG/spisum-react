import { Dispatch } from "react";
import {
  onSetPreviewItemAction,
  onTabIsLoadingAction,
  onTabIsSavedAction,
  onTabIsSavingAction,
  onTabIsValidAction,
  TabAndDialogChannelActionType
} from "../_actions";
import {
  ChannelPreviewItemType,
  ChannelStateType,
  TabAndDialogChannelType
} from "../_types";

export class TabAndDialogChannel implements TabAndDialogChannelType {
  private _triggerValidation: (() => Promise<void>) | null = null;

  isValid: boolean = true;
  isLoading: boolean = false;
  isSaving: boolean = false;
  isSaved: boolean = true;
  state: ChannelStateType = {};
  previewItem: ChannelPreviewItemType;

  constructor(
    private tabName: string,
    private dispatch: Dispatch<TabAndDialogChannelActionType>
  ) {}

  registerTriggerValidationClb(triggerValidation: () => Promise<void>): void {
    this._triggerValidation = triggerValidation;
  }

  setState(state: ChannelStateType): void {
    this.state = state;
  }

  setIsLoading(isLoading: boolean): void {
    if (this.isLoading === isLoading) {
      return;
    }

    this.isLoading = isLoading;

    this.dispatch(onTabIsLoadingAction({ tabName: this.tabName, isLoading }));
  }

  setIsSaved(isSaved: boolean): void {
    if (this.isSaved === isSaved) {
      return;
    }

    this.isSaved = isSaved;

    this.dispatch(onTabIsSavedAction({ tabName: this.tabName, isSaved }));
  }

  setIsSaving(isSaving: boolean): void {
    if (this.isSaving === isSaving) {
      return;
    }

    this.isSaving = isSaving;

    this.dispatch(onTabIsSavingAction({ tabName: this.tabName, isSaving }));
  }

  setIsValid(isValid: boolean): void {
    if (this.isValid === isValid) {
      return;
    }

    this.isValid = isValid;

    this.dispatch(onTabIsValidAction({ tabName: this.tabName, isValid }));
  }

  setPreviewItem(item: ChannelPreviewItemType, showPreview?: boolean): void {
    if (this.previewItem === item && !showPreview) {
      return;
    }

    this.previewItem = item;

    this.dispatch(
      onSetPreviewItemAction({
        item,
        showPreview,
        tabName: this.tabName
      })
    );
  }

  triggerValidation(): Promise<void> {
    if (!this._triggerValidation) {
      this.setIsValid(true);

      return Promise.resolve();
    }

    return this._triggerValidation();
  }
}
