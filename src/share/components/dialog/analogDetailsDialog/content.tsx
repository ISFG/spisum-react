import { callAsyncAction } from "core/action";
import {
  documentRegisterActionType,
  documentSaveAndUpdateActionType,
  documentUpdateActionType
} from "core/api/document/_actions";
import { SslProperties } from "core/api/models";
import {
  primaryAction,
  secondaryAction
} from "core/components/dialog/lib/actionsFactory";
import { CommentsTab } from "core/components/dialog/tabs/comments";
import { ComponentsTab } from "core/components/dialog/tabs/components";
import { SettleTab } from "core/components/dialog/tabs/settle/SettleTab";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { GenericDocument } from "core/types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { createDocumentDialog } from "../baseDocumentDialog/documentDialogFactory";
import { handoverDocument } from "../documentHandoverDialog/_actions";
import { HandoverDocumentPayloadType } from "../documentHandoverDialog/_types";
import MetaDataTab from "./MetadataFormTab";

export const analogDetailsDialog: DialogContentType = createDocumentDialog({
  actions: () => [
    primaryAction(
      t(translationPath(lang.dialog.form.toRegister)),
      ({ dispatch, channels, onClose, buttonState }) => {
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
            action: documentSaveAndUpdateActionType,
            onError,
            onSuccess,
            payload: {
              payload: {
                body: {
                  properties: formValues as SslProperties
                },
                nodeId: channels?.Metadata?.state?.id as string
              },
              registerAction: documentRegisterActionType,
              updateAction: documentUpdateActionType
            }
          })
        );
      }
    ),
    secondaryAction(
      t(translationPath(lang.dialog.form.toRegisterAndRefer)),
      ({ dispatch, channels, onClose, buttonState }) => {
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

          dispatch(
            handoverDocument({
              data: {
                id: channels?.Metadata?.state?.id
              },
              onClose: () => {
                dispatch(documentViewAction__Refresh(true));
              }
            } as HandoverDocumentPayloadType)
          );
          onClose();
        };

        const onError = () => {
          buttonState.setIsPending(false);
          channels?.Metadata?.setIsSaved(false);
        };

        buttonState.setIsPending(true);

        dispatch(
          callAsyncAction({
            action: documentSaveAndUpdateActionType,
            onError,
            onSuccess,
            payload: {
              payload: {
                body: {
                  properties: formValues as SslProperties
                },
                nodeId: channels?.Metadata?.state?.id as string
              },
              registerAction: documentRegisterActionType,
              updateAction: documentUpdateActionType
            }
          })
        );
      }
    )
  ],
  tabs: [
    {
      content: MetaDataTab,
      label: t(translationPath(lang.dialog.tabs.metadata))
    },
    {
      content: ComponentsTab,
      label: t(translationPath(lang.dialog.tabs.components))
    },
    {
      content: CommentsTab,
      label: t(translationPath(lang.dialog.tabs.notes))
    },
    {
      content: SettleTab,
      filter: ({ dialogProps }) => {
        const { state } =
          (dialogProps.data as GenericDocument)?.properties?.ssl || {};

        return SettleTab.filter(state);
      },
      label: t(translationPath(lang.dialog.tabs.settle))
    }
  ],
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.analogDocumentIncome))}
      {...props}
    />
  ),
  type: DialogType.AnalogDetails
});
