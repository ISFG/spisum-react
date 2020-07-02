import { callAsyncAction } from "core/action";
import { databoxDontRegisterActionType } from "core/api/databox/_actions";
import { emailDontRegisterActionType } from "core/api/email/_actions";
import {
  DialogContentType,
  DialogDataProps,
  DialogType
} from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import { GenericDocument } from "core/types";
import { SpisumNodeTypes } from "enums";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { DontRegisterDocumentContent } from "./DontRegisterDocumentContent";
import { DontRegisterDocumentFormValues } from "./_types";
import NamedTitle from "../../../../core/components/namedTitle";
import React from "react";

export const dontRegisterDocumentDialog: DialogContentType = {
  actions: [
    {
      color: "secondary",
      name: t(translationPath(lang.dialog.form.confirm)),
      onClick: ({ dispatch, channels, dialogData, onClose, buttonState }) => {
        const onSuccess = () => {
          onClose();
          dispatch(documentViewAction__Refresh(true));
          (dialogData as DialogDataProps)?.onSuccess?.();
        };

        const onError = () => {
          buttonState.setIsPending(false);
          (dialogData as DialogDataProps)?.onError?.();
        };

        const { nodeType, id } = dialogData as GenericDocument;

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
      },
      type: "outlined"
    }
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
