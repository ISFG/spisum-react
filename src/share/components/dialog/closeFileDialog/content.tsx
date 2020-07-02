import { callAsyncAction } from "core/action";
import { closeFileAction } from "core/api/file/_actions";
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
import { SettleDocumentContent } from "../settleDocumentDialog/SettleDocumentDialog";
import { SettleDocumentFormValues } from "../settleDocumentDialog/_types";
import NamedTitle from "../../../../core/components/namedTitle";
import React from "react";

export const closeFileDialog: DialogContentType = {
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.form.confirm)),
      ({ dispatch, channels, dialogData, onClose, buttonState }) => {
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
            action: closeFileAction,
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
      }
    )
  ],
  content: SettleDocumentContent,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.closed))}
      {...props}
    />
  ),
  type: DialogType.CloseFile
};
