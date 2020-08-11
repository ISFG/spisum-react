import { callAsyncAction } from "core/action";
import { closeFileAction } from "core/api/file/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { NotificationSeverity } from "core/components/notifications/_types";
import { GenericDocument } from "core/types";
import { ErrorCodeList } from "enums";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { ErrorType } from "types";
import { SettleDocumentContent } from "../settleDocumentDialog/SettleDocumentDialog";
import { SettleDocumentFormValues } from "../settleDocumentDialog/_types";

export const closeFileDialog: DialogContentType = {
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

        const onErrorNotification = (payload: ErrorType) => {
          const getErrorMessage = (code: string | null) => {
            return code === ErrorCodeList.SettleOutputReadableType
              ? t(
                  translationPath(
                    lang.dialog.notifications.settleOutputReadableType
                  )
                )
              : t(translationPath(lang.dialog.notifications.actionFailed));
          };

          return {
            message: getErrorMessage(payload?.code),
            severity: NotificationSeverity.Error
          };
        };

        const { id } = dialogProps.data as GenericDocument;

        buttonState.setIsPending(true);

        const formValues = channels.contentTab?.state
          ?.formValues as SettleDocumentFormValues;

        dispatch(
          callAsyncAction({
            action: closeFileAction,
            onError,
            onErrorNotification,
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
