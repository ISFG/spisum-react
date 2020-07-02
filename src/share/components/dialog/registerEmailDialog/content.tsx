import { callAsyncAction } from "core/action";
import {
  documentRegisterActionType,
  documentSaveAndUpdateActionType,
  documentUpdateActionType
} from "core/api/document/_actions";
import { SslEmail } from "core/api/models";
import {
  primaryAction,
  secondaryAction
} from "core/components/dialog/lib/actionsFactory";
import { CommentsTab } from "core/components/dialog/tabs/comments";
import { ComponentsTab } from "core/components/dialog/tabs/components";
import {
  DialogContentType,
  DialogDataProps,
  DialogType
} from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import { EmailDocument } from "core/types";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { createDocumentDialog } from "../baseDocumentDialog/documentDialogFactory";
import { handoverDocument } from "../documentHandoverDialog/_actions";
import { MetadataFormTab } from "./MetadataFormTab";
import NamedTitle from "../../../../core/components/namedTitle";
import React from "react";

export const registerEmailDialog: DialogContentType = createDocumentDialog({
  actions: [
    primaryAction(
      t(translationPath(lang.dialog.form.toRegister)),
      ({ dispatch, channels, onClose, dialogData, buttonState }) => {
        const formValues = channels?.Metadata?.state?.formValues;
        if (!formValues) return;

        const onSuccess = () => {
          // set all tabs to saved to close modal
          for (const key in channels) {
            if (!channels.hasOwnProperty(key)) continue;
            channels[key].setIsSaved(true);
          }

          dispatch(documentViewAction__Refresh(true));
          (dialogData as DialogDataProps)?.onSuccess?.();
          onClose();
        };

        const onError = () => {
          (dialogData as DialogDataProps)?.onError?.();
          buttonState.setIsPending(false);
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
                  properties: formValues as SslEmail
                },
                nodeId: channels?.Metadata?.state?.id
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
      ({ dispatch, channels, onClose, buttonState, dialogData }) => {
        const formValues = channels?.Metadata?.state?.formValues;
        if (!formValues) return;

        const onSuccess = () => {
          // set all tabs to saved to close modal
          for (const key in channels) {
            if (!channels.hasOwnProperty(key)) continue;
            channels[key].setIsSaved(true);
          }

          dispatch(
            handoverDocument({
              id: channels?.Metadata?.state?.id
            } as EmailDocument)
          );
          (dialogData as DialogDataProps)?.onSuccess?.();
          onClose();
        };

        const onError = () => {
          buttonState.setIsPending(false);
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
                  properties: formValues as SslEmail
                },
                nodeId: channels?.Metadata?.state?.id
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
      content: MetadataFormTab,
      label: t(translationPath(lang.dialog.tabs.metadata))
    },
    {
      content: ComponentsTab,
      label: t(translationPath(lang.dialog.tabs.components))
    },
    {
      content: CommentsTab,
      label: t(translationPath(lang.dialog.tabs.notes))
    }
  ],
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.digitalDocumentIncome))}
      {...props}
    />
  ),
  type: DialogType.RegisterEmail
});
