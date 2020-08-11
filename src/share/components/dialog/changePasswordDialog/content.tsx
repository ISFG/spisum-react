import { callAsyncAction } from "core/action";
import { changePasswordAction } from "core/api/user/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import {
  DialogContentPropsType,
  DialogType
} from "core/components/dialog/_types";
import NamedTitle from "core/components/namedTitle";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { ChangePasswordDialog } from "./ChangePasswordDialog";
import { ChangePasswordFormValues } from "./_types";

export const changePasswordDialog = {
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, channels, onClose, buttonState }) => {
        const onSuccess = () => {
          onClose();
        };

        const onError = () => {
          buttonState.setIsPending(false);
        };

        const { oldPassword, newPassword } = channels.contentTab.state
          ?.formValues as ChangePasswordFormValues;

        buttonState.setIsPending(true);

        dispatch(
          callAsyncAction({
            action: changePasswordAction,
            onError,
            onSuccess,
            payload: {
              body: {
                newPassword,
                oldPassword
              }
            }
          })
        );
      }
    )
  ],
  content: ChangePasswordDialog,
  title: (props: DialogContentPropsType) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.changePassword))}
      {...props}
    />
  ),
  type: DialogType.ChangePassword
};
