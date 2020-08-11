import { callAsyncAction } from "core/action";
import { updateUserAction } from "core/api/user/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import NamedTitle from "core/components/namedTitle";
import { NotificationSeverity } from "core/components/notifications/_types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { createDocumentDialog } from "../baseDocumentDialog/documentDialogFactory";
import { MetaDataTab } from "../createUserDialog/MetaDataContent";

export const editUserDialog: DialogContentType = createDocumentDialog({
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.form.confirm)),
      ({
        dispatch,
        channels,
        dialogProps,
        onClose,
        buttonState
      }) => {
        const onSuccess = () => {
          onClose();
          dialogProps.onSuccess?.();
        };

        const onError = () => {
          buttonState.setIsPending(false);
          dialogProps.onError?.();
        };

        buttonState.setIsPending(true);

        dispatch(
          callAsyncAction({
            action: updateUserAction,
            onError,
            onErrorNotification: {
              message: t(
                translationPath(lang.dialog.notifications.updateUserFailed)
              ),
              severity: NotificationSeverity.Error
            },
            onSuccess,
            onSuccessNotification: {
              message: t(
                translationPath(lang.dialog.notifications.updateUserSucceeded)
              ),
              severity: NotificationSeverity.Success
            },
            payload: {
              body: channels.contentTab?.state?.formValues
            }
          })
        );
      }
    )
  ],
  content: MetaDataTab,
  title: (props) => (
    <NamedTitle text={t(translationPath(lang.general.editUser))} {...props} />
  ),
  type: DialogType.EditUserDialog
});
