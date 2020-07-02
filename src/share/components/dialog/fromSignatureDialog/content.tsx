import { callAsyncAction } from "core/action";
import { documentFromSignatureActionType } from "core/api/document/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { ComponentsFromSignatureTab } from "core/components/dialog/tabs/fromSignatureComponents";
import {
  DialogContentPropsType,
  DialogDataProps,
  DialogType
} from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import { GenericDocument } from "core/types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import NamedTitle from "../../../../core/components/namedTitle";
import { createDocumentDialog } from "../baseDocumentDialog/documentDialogFactory";

export const fromSignatureDialog = createDocumentDialog({
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.finish)),
      ({ dispatch, channels, dialogData, onClose, buttonState }) => {
        onClose();
        const onSuccess = () => {
          onClose();
          dispatch(documentViewAction__Refresh(true));
          buttonState.setIsPending(false);
          (dialogData as DialogDataProps)?.onSuccess?.();
        };

        const onError = () => {
          buttonState.setIsPending(false);
          (dialogData as DialogDataProps)?.onError?.();
        };

        const { id } = dialogData as GenericDocument;

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
  content: ComponentsFromSignatureTab,
  title: (props: DialogContentPropsType) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.forSignature))}
      {...props}
    />
  ),
  type: DialogType.FromSignature
});
