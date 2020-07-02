import { callAsyncAction } from "core/action";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import {
  DialogContentType,
  DialogDataProps,
  DialogType
} from "core/components/dialog/_types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { deactivateUserAction } from "../../../../core/api/user/_actions";
import NamedTitle from "../../../../core/components/namedTitle";
import { NotificationSeverity } from "../../../../core/components/notifications/_types";
import CancelDialog from "../cancelDialog/CancelDialog";

export const deactivateUserDialog: DialogContentType = {
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, dialogData, onClose, buttonState }) => {
        if (!dialogData) {
          return;
        }

        buttonState.setIsPending(true);

        dispatch(
          callAsyncAction({
            action: deactivateUserAction,
            onError: onClose,
            onErrorNotification: {
              message: t(
                translationPath(lang.dialog.notifications.deactivateUserFailed)
              ),
              severity: NotificationSeverity.Error
            },
            onSuccess: onClose,
            onSuccessNotification: {
              message: t(
                translationPath(
                  lang.dialog.notifications.deactivateUserSucceeded
                )
              ),
              severity: NotificationSeverity.Success
            },
            payload: {
              userId: (dialogData as DialogDataProps).id
            }
          })
        );
      }
    )
  ],
  content: (props) => (
    <CancelDialog
      {...props}
      style={{ fontWeight: "bold" }}
      question={t(translationPath(lang.dialog.content.deactivateUser), {
        id: (props.dialogData as DialogDataProps)?.id
      })}
    />
  ),
  title: (props) => (
    <NamedTitle text={t(translationPath(lang.general.deactivate))} {...props} />
  ),
  type: DialogType.DeactivateUser
};
