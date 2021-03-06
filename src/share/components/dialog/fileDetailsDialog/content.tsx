import { callAsyncAction } from "core/action";
import { updateFileAction } from "core/api/file/_actions";
import { SslProperties } from "core/api/models";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { CommentsTab } from "core/components/dialog/tabs/comments";
import { HistoryTab } from "core/components/dialog/tabs/history";
import { ProcessingOrClosingTab } from "core/components/dialog/tabs/processingOrClosing/ProcessingOrClosingTab";
import { SaveAndDiscardTab } from "core/components/dialog/tabs/saveAndDiscard/SaveAndDiscardTab";
import { ShipmentTab } from "core/components/dialog/tabs/shipment";
import { TableOfContentsTab } from "core/components/dialog/tabs/tableOfContents";
import {
  DialogContentType,
  DialogDataGenericData,
  DialogType
} from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { GenericDocument } from "core/types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { createDocumentDialog } from "../baseDocumentDialog/documentDialogFactory";
import MetadataFormTab from "./MetadataFormTab";

export const fileDetailsDialog: DialogContentType = createDocumentDialog({
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.form.edit)),
      ({
        dispatch,
        dialogProps,
        onClose,
        channels,
        buttonState
      }) => {
        const formValues = channels?.Metadata?.state?.formValues;
        if (!formValues) {
          return;
        }

        const onSuccess = () => {
          // set all tabs to saved to close modal
          for (const key in channels) {
            if (!channels.hasOwnProperty(key)) continue;
            channels[key].setIsSaved(true);
          }

          dispatch(documentViewAction__Refresh(true));
          onClose();
        };

        const onError = () => {
          buttonState.setIsPending(false);
          channels?.Metadata?.setIsSaved(false);
        };

        buttonState.setIsPending(true);
        dispatch(
          callAsyncAction({
            action: updateFileAction,
            onError,
            onSuccess,
            payload: {
              nodeId: (dialogProps.data as DialogDataGenericData)?.id,
              properties: formValues as SslProperties
            }
          })
        );
      }
    )
  ],
  tabs: [
    {
      content: MetadataFormTab,
      label: t(translationPath(lang.dialog.tabs.metadata))
    },
    {
      content: TableOfContentsTab,
      label: t(translationPath(lang.dialog.tabs.content))
    },
    {
      content: ProcessingOrClosingTab,
      filter: ({ dialogProps }) => {
        const { state } =
          (dialogProps.data as GenericDocument)?.properties?.ssl || {};
        return ProcessingOrClosingTab.filter(state);
      },
      label: t(translationPath(lang.dialog.tabs.processOrClose))
    },
    {
      content: ShipmentTab,
      label: t(translationPath(lang.dialog.tabs.shipment))
    },
    {
      content: SaveAndDiscardTab,
      filter: ({ dialogProps }) => {
        const { state } =
          (dialogProps.data as GenericDocument)?.properties?.ssl || {};

        return SaveAndDiscardTab.filter(state);
      },
      label: t(translationPath(lang.dialog.tabs.saveAndDiscard))
    },
    {
      content: CommentsTab,
      label: t(translationPath(lang.dialog.tabs.notes))
    },
    {
      content: HistoryTab,
      label: t(translationPath(lang.dialog.tabs.history))
    }
  ],
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.fileDetail))}
      {...props}
    />
  ),
  type: DialogType.FileDetails
});
