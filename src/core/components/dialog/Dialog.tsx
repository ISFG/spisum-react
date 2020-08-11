import { CircularProgress } from "@material-ui/core";
import MuiDialog from "@material-ui/core/Dialog";
import MuiTooltip from "@material-ui/core/Tooltip";
import clsx from "clsx";
import { debounce } from "lodash";
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
  StyledRefreshIcon,
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
  DialogType,
  TabAndDialogChannelType
} from "./_types";

export interface OwnProps extends DialogContentType {
  onClose: (props: ActionOnCloseType) => void;
  dialogProps: DialogDataProps;
  reloadDialog: VoidFunction;
}

// tab
// - oznamit, ze jsou neulozene zmeny
// - oznamit, ze jsou nevalidni data
// - ma novou volitelnou property - renderPreview
// akce
// - dostanou dispatch a dialogProps
// dialog
// - po kliknuti na akci musi zjistit, jestli jsou data validni
// - po kliknuti na zrusit musi zjistit, jestl jsou neulozena data
// - mel by se zavrit az kdyz akce uspesne probehla

// used when the tabs property is missing, so we use only the content
const CONTENT_TAB = "contentTab";

const Dialog = ({
  actions,
  content: Content,
  dialogProps,
  onClose,
  renderPreview,
  tabs,
  title: Title
}: OwnProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(true);
  const [activeChannel, setActiveChannel] = useState<
    TabAndDialogChannelType | undefined
  >();
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
    const allChannelsSaved = Object.values(channels).every(
      (channel) => channel.isSaved
    );

    if (allChannelsSaved || dialogProps.dontUseDataModifiedDialog) {
      const parentMetaData = dialogProps.parentDialogChannels?.Metadata;
      setOpen(false);
      onClose({
        channels,
        dialogProps,
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
        dialogProps: {
          data: {
            formValues: channels?.Metadata?.state?.formValues as SslProperties,
            id: channels?.Metadata?.state?.id as string,
            nodeType: channels?.Metadata?.state?.nodeType
          },
          onSuccess: () => {
            onClose({
              channels,
              dialogProps,
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
        dialogProps,
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
        {previewItem && renderPreview(dialogProps, previewItem)}
      </div>
    );
  }, [showPreview, renderPreview, previewItem, dialogProps]); // eslint-disable-line react-hooks/exhaustive-deps

  const refreshTabDebounced = useMemo(() => {
    return activeChannel?.refreshData
      ? debounce(activeChannel?.refreshData, 500, { leading: true })
      : () => {};
  }, [activeChannel]);

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
              <Title
                dialogProps={dialogProps}
                channel={channels[CONTENT_TAB]}
              />
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
              {activeChannel?.refreshData && (
                <MuiTooltip
                  aria-label={t(translationPath(lang.dialog.form.refresh))}
                  title={t(translationPath(lang.dialog.form.refresh))}
                >
                  <StyledRefreshIcon
                    data-test-id="dialog-refresh-tab-icon"
                    onClick={refreshTabDebounced}
                  />
                </MuiTooltip>
              )}
            </StyledDialogTitle>
          )}
          {tabs?.length && (
            <Tabs
              tabs={tabs}
              dialogProps={dialogProps}
              setActiveChannel={setActiveChannel}
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
                dialogProps={dialogProps}
                channel={channels[CONTENT_TAB]}
                onClose={handleClose}
              />
            </div>
          )}
          {!dialogProps.isReadonly && (
            <div
              className={clsx(classes.actionsContainer, {
                [classes.widthHalf]: showPreview
              })}
            >
              {actions && (
                <ActionButtons
                  actions={actions}
                  dialogProps={dialogProps}
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
