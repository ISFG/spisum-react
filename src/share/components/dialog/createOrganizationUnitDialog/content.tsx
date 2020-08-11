import { callAsyncAction } from "core/action";
import { createOrganizationUnitAction } from "core/api/groups/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { NotificationSeverity } from "core/components/notifications/_types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { CreateOrganizationUnitDialogContent } from "./CreateOrganizationUnitDialog";

export const CreateOrganizationUnitDialog: DialogContentType = {
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({
        onClose,
        dispatch,
        channels,
        buttonState,
        dialogProps
      }) => {
        const formValues = channels?.contentTab?.state?.formValues;
        if (!formValues) return;
        buttonState.setIsPending(true);
        const onError = () => {
          buttonState.setIsPending(false);
        };
        const onSuccess = () => {
          onClose();
          dispatch(documentViewAction__Refresh(true));
        };

        dispatch(
          callAsyncAction({
            action: createOrganizationUnitAction,
            onError,
            onErrorNotification: {
              message: t(
                translationPath(
                  lang.dialog.notifications.createOrganizationUnitFailed
                )
              ),
              severity: NotificationSeverity.Error
            },
            onSuccess,
            onSuccessNotification: {
              message: t(
                translationPath(
                  lang.dialog.notifications.createOrganizationUnitSuccess
                )
              ),
              severity: NotificationSeverity.Success
            },
            payload: {
              ...formValues
            }
          })
        );
      }
    )
  ],
  content: CreateOrganizationUnitDialogContent,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.general.createOrganizationUnit))}
      {...props}
    />
  ),
  type: DialogType.CreateOrganizationUnit
};
