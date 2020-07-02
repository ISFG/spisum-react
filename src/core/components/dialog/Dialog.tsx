import { CircularProgress } from "@material-ui/core";
import MuiDialog from "@material-ui/core/Dialog";
import MuiTooltip from "@material-ui/core/Tooltip";
import clsx from "clsx";
import React, { useCallback, useMemo, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { SslProperties } from "../../api/models";
import { ErrorBoundary } from "../errorBoundary";
import { DialogError } from "../errorBoundary/errorTypes/DialogErrors";
import ActionButtons from "./ActionButtons";
import {
  StyledCancelIcon,
  StyledDialogTitle,
  useStyles
} from "./Dialog.styles";
import { TabAndDialogChannel } from "./lib/TabAndDialogChannel";
import PreviewButton from "./PreviewButton";
import Tabs from "./tabs";
import { dialogOpenAction, onSetShowPreview } from "./_actions";
import { initialState, reducer } from "./_componentReducer";
import { createChannelsForTabs, triggerChannelsValidation } from "./_methods";
import {
  ActionButtonStateType,
  ActionOnCloseType,
  ActionType,
  ChannelsType,
  DialogContentType,
  DialogDataProps,
  DialogType
} from "./_types";

export interface OwnProps extends DialogContentType {
  onClose: (props: ActionOnCloseType) => void;
  reloadDialog: VoidFunction;
}

// tab
// - oznamit, ze jsou neulozene zmeny
// - oznamit, ze jsou nevalidni data
// - ma novou volitelnou property - renderPreview
// akce
// - dostanou dispatch a dialogData
// dialog
// - po kliknuti na akci musi zjistit, jestli jsou data validni
// - po kliknuti na zrusit musi zjistit, jestl jsou neulozena data
// - mel by se zavrit az kdyz akce uspesne probehla

// used when the tabs property is missing, so we use only the content
const CONTENT_TAB = "contentTab";

const Dialog = ({
  actions,
  content: Content,
  dialogData,
  onClose,
  renderPreview,
  tabs,
  title: Title
}: OwnProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(true);
  const [{ previewItem, showPreview }, componentDispatch] = useReducer(
    reducer,
    initialState
  );

  const channels: ChannelsType = useMemo(() => {
    if (!tabs) {
      return {
        [CONTENT_TAB]: new TabAndDialogChannel(CONTENT_TAB, componentDispatch)
      };
    }

    return createChannelsForTabs(tabs, componentDispatch);
  }, [tabs]);

  const setShowPreview = useCallback(
    (openPreview: boolean) =>
      componentDispatch(onSetShowPreview({ showPreview: openPreview })),
    []
  );

  const handleClose = useCallback(() => {
    const dialogDataTyped = dialogData as DialogDataProps;
    const allChannelsSaved = Object.values(channels).every(
      (channel) => channel.isSaved
    );

    if (allChannelsSaved || dialogDataTyped?.dontUseDataModifiedDialog) {
      const parentMetaData = dialogDataTyped?.parentDialogChannels?.Metadata;
      setOpen(false);
      onClose({
        channels,
        dialogData,
        dispatch
      });
      parentMetaData?.setState({
        ...parentMetaData?.state,
        unsavedChangesDialogOpen: false
      });
      return;
    }

    channels?.Metadata?.setState({
      ...channels?.Metadata?.state,
      unsavedChangesDialogOpen: true
    });

    dispatch(
      dialogOpenAction({
        dialogData: {
          formValues: channels?.Metadata?.state?.formValues as SslProperties,
          id: channels?.Metadata?.state?.id as string,
          nodeType: channels?.Metadata?.state?.nodeType,
          onSuccess: () => {
            onClose({
              channels,
              dialogData,
              dispatch
            });
            setOpen(false);
          },
          parentDialogChannels: channels
        },
        dialogType: DialogType.DataModified
      })
    );
  }, [channels]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleActionClicked = (
    action: ActionType["onClick"],
    buttonState: ActionButtonStateType
  ) => {
    triggerChannelsValidation(channels).then(() => {
      const allChannelsAreValid = Object.values(channels).every(
        (channel) => channel.isValid
      );

      if (!allChannelsAreValid) {
        return;
      }

      // set all channels to is saving
      Object.values(channels).forEach((channel) => channel.setIsSaving(true));

      action({
        buttonState,
        channels,
        dialogData,
        dispatch,
        onClose: handleClose
      });
    });
  };

  const preview = useMemo(() => {
    if (!showPreview || !renderPreview) {
      return null;
    }

    return (
      <div className={classes.previewContainer}>
        {previewItem && renderPreview(dialogData, previewItem)}
      </div>
    );
  }, [showPreview, renderPreview, previewItem, dialogData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MuiDialog
      disableBackdropClick={true}
      fullScreen={showPreview}
      maxWidth="md"
      onClose={handleClose}
      open={open}
      classes={{
        paper: showPreview ? classes.modalFullscreen : classes.modal
      }}
    >
      <ErrorBoundary Component={DialogError} handleClose={handleClose}>
        {preview}
        <div
          className={clsx(classes.detail, {
            [classes.widthHalf]: showPreview,
            [classes.widthFull]: !showPreview
          })}
        >
          {Title && (
            <StyledDialogTitle>
              <Title dialogData={dialogData} channel={channels[CONTENT_TAB]} />
              <MuiTooltip
                aria-label={t(translationPath(lang.dialog.form.close))}
                title={t(translationPath(lang.dialog.form.close))}
              >
                <StyledCancelIcon
                  data-test-id="dialog-close-icon"
                  onClick={handleClose}
                />
              </MuiTooltip>
              {renderPreview && previewItem && (
                <PreviewButton
                  handlePreviewChange={setShowPreview}
                  showPreview={showPreview}
                />
              )}
            </StyledDialogTitle>
          )}
          {tabs?.length && (
            <Tabs
              tabs={tabs}
              dialogData={dialogData}
              onClose={handleClose}
              channels={channels}
              showPreview={showPreview}
            />
          )}
          {Content && (
            <div
              className={clsx(classes.modalBody, {
                [classes.modalBodyFullscreen]: showPreview,
                [classes.modalBodyFullSize]: !showPreview
              })}
            >
              {channels[CONTENT_TAB]?.isLoading && (
                <div className={clsx("body-fullsize", classes.contentCentered)}>
                  <CircularProgress />
                </div>
              )}
              <Content
                dialogData={dialogData}
                channel={channels[CONTENT_TAB]}
                onClose={handleClose}
              />
            </div>
          )}
          {!(dialogData as DialogDataProps)?.isReadonly && (
            <div
              className={clsx(classes.actionsContainer, {
                [classes.widthHalf]: showPreview
              })}
            >
              {actions?.length && (
                <ActionButtons
                  actions={actions}
                  onClose={handleClose}
                  onActionClicked={handleActionClicked}
                />
              )}
            </div>
          )}
        </div>
      </ErrorBoundary>
    </MuiDialog>
  );
};

export default React.memo(Dialog);
