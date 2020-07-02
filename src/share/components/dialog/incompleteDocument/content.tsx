import { callAsyncAction } from "core/action";
import { emailIncompleteActionType } from "core/api/email/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import {
  DialogContentType,
  DialogDataProps,
  DialogType
} from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import { GenericDocument } from "core/types";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { IncompleteDocumentContent } from "./IncompleteDocumentContent";
import { IncompleteDocumentFormValues } from "./_types";
import NamedTitle from "../../../../core/components/namedTitle";
import React from "react";

export const incompleteDocumentDialog: DialogContentType = {
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, channels, dialogData, onClose, buttonState }) => {
        const onSuccess = () => {
          onClose();
          dispatch(documentViewAction__Refresh(true));
          (dialogData as DialogDataProps)?.onSuccess?.();
        };

        const onError = () => {
          buttonState.setIsPending(false);
          (dialogData as DialogDataProps)?.onError?.();
        };

        buttonState.setIsPending(true);

        const { id } = dialogData as GenericDocument;
        const formValues = channels.contentTab?.state
          ?.formValues as IncompleteDocumentFormValues;

        dispatch(
          callAsyncAction({
            action: emailIncompleteActionType,
            onError,
            onSuccess,
            payload: {
              body: formValues.body,
              files: formValues.files,
              nodeId: id,
              subject: formValues.subject
            }
          })
        );
      }
    )
  ],
  content: IncompleteDocumentContent,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.contactTheSender))}
      {...props}
    />
  ),
  type: DialogType.IncompleteDocument
};
