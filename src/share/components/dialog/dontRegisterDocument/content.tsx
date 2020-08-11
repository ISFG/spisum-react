import { callAsyncAction } from "core/action";
import { databoxDontRegisterActionType } from "core/api/databox/_actions";
import { emailDontRegisterActionType } from "core/api/email/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { GenericDocument } from "core/types";
import { SpisumNodeTypes } from "enums";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { DontRegisterDocumentContent } from "./DontRegisterDocumentContent";
import { DontRegisterDocumentFormValues } from "./_types";

export const dontRegisterDocumentDialog: DialogContentType = {
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.form.confirm)),
      ({ dispatch, channels, dialogProps, onClose, buttonState }) => {
        const onSuccess = () => {
          onClose();
          dispatch(documentViewAction__Refresh(true));
          dialogProps.onSuccess?.();
        };

        const onError = () => {
          buttonState.setIsPending(false);
          dialogProps.onError?.();
        };

        const { nodeType, id } = dialogProps.data as GenericDocument;

        const action =
          nodeType === SpisumNodeTypes.Email
            ? emailDontRegisterActionType
            : nodeType === SpisumNodeTypes.Databox
            ? databoxDontRegisterActionType
            : undefined;

        if (!action) {
          return;
        }

        buttonState.setIsPending(true);

        dispatch(
          callAsyncAction({
            action,
            onError,
            onSuccess,
            payload: {
              body: {
                reason: (channels.contentTab?.state
                  ?.formValues as DontRegisterDocumentFormValues).reason
              },
              nodeId: id
            }
          })
        );
      }
    )
  ],
  content: DontRegisterDocumentContent,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.dontRegister))}
      {...props}
    />
  ),
  type: DialogType.DontRegisterDocument
};
