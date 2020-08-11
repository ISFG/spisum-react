import { callAsyncAction } from "core/action";
import { documentFromSignatureActionType } from "core/api/document/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import {
  DialogContentPropsType,
  DialogType
} from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { GenericDocument } from "core/types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { createDocumentDialog } from "../baseDocumentDialog/documentDialogFactory";
import { FromSignatureDialog } from "./FromSignatureDialog";

export const fromSignatureDialog = createDocumentDialog({
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.finish)),
      ({ dispatch, channels, dialogProps, onClose, buttonState }) => {
        onClose();
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

        const { id } = dialogProps.data as GenericDocument;

        buttonState.setIsPending(true);
        dispatch(
          callAsyncAction({
            action: documentFromSignatureActionType,
            onError,
            onSuccess,
            payload: {
              nodeId: id
            }
          })
        );
      }
    )
  ],
  content: FromSignatureDialog,
  title: (props: DialogContentPropsType) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.forSignature))}
      {...props}
    />
  ),
  type: DialogType.FromSignature
});
