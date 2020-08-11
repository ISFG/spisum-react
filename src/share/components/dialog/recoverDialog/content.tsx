import { callAsyncAction } from "core/action";
import { conceptRecoverActionType } from "core/api/concept/_actions";
import { documentRecoverActionType } from "core/api/document/_actions";
import { recoverFileAction } from "core/api/file/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { SpisumNodeTypes } from "enums";
import { groupBy } from "lodash";
import React from "react";
import { classPath, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { RecoverDialogContent } from "./RecoverDialog";
import { RecoverDialogFormValues } from "./_types";

export const recoverDialog: DialogContentType = {
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.form.confirm)),
      ({ dispatch, channels, dialogProps, onClose, buttonState }) => {
        const onSuccess = () => {
          onClose();
          dispatch(documentViewAction__Refresh(true));
          buttonState.setIsPending(false);
          dialogProps.onSuccess?.();
        };

        const onError = () => {
          buttonState.setIsPending(false);
          dialogProps.onError?.();
        };

        const nodes = dialogProps.data as GenericDocument[];
        const groupedNodes = groupBy(
          nodes,
          classPath(genericDocumentProxy.nodeType).path
        );

        if (groupedNodes[SpisumNodeTypes.Concept]) {
          const conceptIds = groupedNodes[SpisumNodeTypes.Concept].map(
            ({ id }) => id
          );

          dispatch(
            callAsyncAction({
              action: conceptRecoverActionType,
              onError,
              onSuccess,
              payload: {
                body: {
                  ids: conceptIds,
                  reason: (channels.contentTab?.state
                    ?.formValues as RecoverDialogFormValues).reason
                }
              }
            })
          );
          buttonState.setIsPending(true);
        } else if (groupedNodes[SpisumNodeTypes.Document]) {
          const documentsIds = groupedNodes[SpisumNodeTypes.Document].map(
            ({ id }) => id
          );

          dispatch(
            callAsyncAction({
              action: documentRecoverActionType,
              onError,
              onSuccess,
              payload: {
                body: {
                  ids: documentsIds,
                  reason: (channels.contentTab?.state
                    ?.formValues as RecoverDialogFormValues).reason
                }
              }
            })
          );
          buttonState.setIsPending(true);
        } else if (groupedNodes[SpisumNodeTypes.File]) {
          const fileIds = groupedNodes[SpisumNodeTypes.File].map(
            ({ id }) => id
          );

          dispatch(
            callAsyncAction({
              action: recoverFileAction,
              onError,
              onSuccess,
              payload: {
                body: {
                  ids: fileIds,
                  reason: (channels.contentTab?.state
                    ?.formValues as RecoverDialogFormValues).reason
                }
              }
            })
          );
          buttonState.setIsPending(true);
        }
      }
    )
  ],
  content: RecoverDialogContent,
  title: (props) => (
    <NamedTitle text={t(translationPath(lang.general.restore))} {...props} />
  ),
  type: DialogType.RecoverDialog
};
