import { callAsyncAction } from "core/action";
import { addFileAction, createFileAction } from "core/api/file/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import { GenericDocument } from "core/types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import NamedTitle from "../../../../core/components/namedTitle";
import { CreateNewDocumentFileDialogContent } from "./CreateNewDocumentFileDialog";
import { CreateNewDocumentFileFormValues, FileOption } from "./_types";

export const createNewDocumentFileDialog: DialogContentType = {
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.form.confirm)),
      ({ dispatch, channels, dialogData, onClose, buttonState }) => {
        const formValues = channels.contentTab?.state
          ?.formValues as CreateNewDocumentFileFormValues;

        if (!formValues) {
          return;
        }

        const onSuccess = () => {
          dispatch(documentViewAction__Refresh(true));
          buttonState.setIsPending(false);
          onClose();
        };

        const onError = () => {
          buttonState.setIsPending(false);
        };

        buttonState.setIsPending(true);

        if (formValues?.selected === FileOption.Create) {
          dispatch(
            callAsyncAction({
              action: createFileAction,
              onError,
              onSuccess,
              payload: {
                documentId: (dialogData as GenericDocument)?.id
              }
            })
          );
        } else if (formValues?.selected === FileOption.Existing) {
          dispatch(
            callAsyncAction({
              action: addFileAction,
              onError,
              onSuccess,
              payload: {
                documentIds: [(dialogData as GenericDocument)?.id],
                nodeId: formValues.nodeId
              }
            })
          );
        }
      }
    )
  ],
  content: CreateNewDocumentFileDialogContent,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.general.pasteToFile))}
      {...props}
    />
  ),
  type: DialogType.CreateNewDocumentFile
};
