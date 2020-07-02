import { callAsyncAction } from "core/action";
import { documentSettleActionType } from "core/api/document/_actions";
import {
  DialogContentType,
  DialogDataProps,
  DialogType
} from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import { GenericDocument } from "core/types";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { SettleDocumentContent } from "./SettleDocumentDialog";
import { SettleDocumentFormValues } from "./_types";
import NamedTitle from "../../../../core/components/namedTitle";
import React from "react";

export const settleDocumentDialog: DialogContentType = {
  actions: [
    {
      color: "secondary",
      name: t(translationPath(lang.dialog.form.confirm)),
      onClick: ({ dispatch, channels, dialogData, onClose, buttonState }) => {
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

        const formValues = channels.contentTab?.state
          ?.formValues as SettleDocumentFormValues;

        dispatch(
          callAsyncAction({
            action: documentSettleActionType,
            onError,
            onSuccess,
            payload: {
              body: {
                customSettleMethod: formValues.customSettleMethod,
                settleDate: formValues.settleDate,
                settleMethod: formValues.settleMethod,
                settleReason: formValues.settleReason
              },
              nodeId: id
            }
          })
        );
      },
      type: "contained"
    }
  ],
  content: SettleDocumentContent,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.settle))}
      {...props}
    />
  ),
  type: DialogType.SettleDocument
};
