import { callAsyncAction } from "core/action";
import { deleteOrganizationUnitAction } from "core/api/groups/_actions";
import { GroupMember } from "core/api/models";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { NotificationSeverity } from "core/components/notifications/_types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import DeleteOrganizationUnit from "./DeleteOrganizationUnit";

export const deleteOrganizationUnitDialog: DialogContentType = {
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, dialogProps, onClose, buttonState }) => {
        if (!dialogProps.data) {
          return;
        }
        const id = (dialogProps.data as GroupMember).id;
        if (!id) {
          return;
        }
        const onSuccess = () => {
          dispatch(documentViewAction__Refresh(true));
          onClose();
        };

        buttonState.setIsPending(true);

        dispatch(
          callAsyncAction({
            action: deleteOrganizationUnitAction,
            onError: onClose,
            onErrorNotification: {
              message: t(
                translationPath(
                  lang.dialog.notifications.deleteOrganizationUnitFailed
                )
              ),
              severity: NotificationSeverity.Error
            },
            onSuccess,
            onSuccessNotification: {
              message: t(
                translationPath(
                  lang.dialog.notifications.deleteOrganizationUnitSuccess
                )
              ),
              severity: NotificationSeverity.Success
            },
            payload: {
              groupId: id
            }
          })
        );
      }
    )
  ],
  content: (props) => <DeleteOrganizationUnit {...props} />,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.deleteOrganizationUnit))}
      {...props}
    />
  ),
  type: DialogType.DeleteOrganizationUnit
};
