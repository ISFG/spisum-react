import { callAsyncAction } from "core/action";
import { updateOrganizationUnitAction } from "core/api/groups/_actions";
import { GroupMember } from "core/api/models";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { NotificationSeverity } from "core/components/notifications/_types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { UpdateOrganizationUnitDialogContent } from "./UpdateOrganizationUnitDialog";
import { UpdateOrganizationUnitFormValues } from "./_types";

export const UpdateOrganizationUnitDialog: DialogContentType = {
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
        if (!formValues || !dialogProps) return;
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
            action: updateOrganizationUnitAction,
            onError,
            onErrorNotification: {
              message: t(
                translationPath(
                  lang.dialog.notifications.updateOrganizationUnitFailed
                )
              ),
              severity: NotificationSeverity.Error
            },
            onSuccess,
            onSuccessNotification: {
              message: t(
                translationPath(
                  lang.dialog.notifications.updateOrganizationUnitSuccess
                )
              ),
              severity: NotificationSeverity.Success
            },
            payload: {
              groupId: (dialogProps.data as GroupMember).id,
              name: (formValues as UpdateOrganizationUnitFormValues)?.name
            }
          })
        );
      }
    )
  ],
  content: UpdateOrganizationUnitDialogContent,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.general.updateOrganizationUnit))}
      {...props}
    />
  ),
  type: DialogType.UpdateOrganizationUnit
};
