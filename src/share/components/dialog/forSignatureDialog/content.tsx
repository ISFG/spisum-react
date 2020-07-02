import { callAsyncAction } from "core/action";
import { documentForSignatureActionType } from "core/api/document/_actions";
import { SslProperties } from "core/api/models";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import {DialogContentPropsType, DialogType} from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import { GenericDocument } from "core/types";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { ForSignatureContent } from "./ForSignatureContent";
import { ForSignatureFormValues } from "./_types";
import NamedTitle from "../../../../core/components/namedTitle";
import React from "react";

export const forSignatureDialog = {
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, channels, dialogData, onClose, buttonState }) => {
        const onSuccess = () => {
          dispatch(documentViewAction__Refresh(true));
          onClose();
        };

        const onError = () => {
          buttonState.setIsPending(false);
        };

        buttonState.setIsPending(true);

        const { group, user } = channels.contentTab.state
          ?.formValues as ForSignatureFormValues;
        dispatch(
          callAsyncAction({
            action: documentForSignatureActionType,
            onError,
            onSuccess,
            payload: {
              body: {
                group,
                user
              } as SslProperties,
              nodeId: (dialogData as GenericDocument).id
            }
          })
        );
      }
    )
  ],
  content: ForSignatureContent,
  title: (props: DialogContentPropsType) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.signatureRequest))}
      {...props}
    />
  ),
  type: DialogType.ForSignature
};
