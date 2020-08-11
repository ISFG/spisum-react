import { callAsyncAction } from "core/action";
import { createUserAction } from "core/api/user/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { NotificationSeverity } from "core/components/notifications/_types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { createDocumentDialog } from "../baseDocumentDialog/documentDialogFactory";
import { MetaDataTab } from "./MetaDataContent";

export const createUserDialog: DialogContentType = createDocumentDialog({
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
          dispatch(documentViewAction__Refresh(true));
          dialogProps.onSuccess?.();
        };

        const onError = () => {
          buttonState.setIsPending(false);
          dialogProps.onError?.();
        };

        buttonState.setIsPending(true);

        dispatch(
          callAsyncAction({
            action: createUserAction,
            onError,
            onErrorNotification: {
              message: t(
                translationPath(lang.dialog.notifications.createUserFailed)
              ),
              severity: NotificationSeverity.Error
            },
            onSuccess,
            onSuccessNotification: {
              message: t(
                translationPath(lang.dialog.notifications.createUserSucceeded)
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
    <NamedTitle text={t(translationPath(lang.general.createUser))} {...props} />
  ),
  type: DialogType.CreateUser
});
