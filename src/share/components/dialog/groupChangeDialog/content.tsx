import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { notificationAction } from "core/components/notifications/_actions";
import { setActiveGroupAction } from "core/features/login/_actions";
import React from "react";
import { lang, t } from "translation/i18n";
import { translationPath } from "../../../utils/getPath";
import { GroupChangeContent } from "./GroupChangeContent";
import { GroupChangeFormValuesType } from "./_types";

export const groupChangeDialog: DialogContentType = {
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ channels, dispatch, onClose, buttonState }) => {
        buttonState.setIsPending(true);
        const activeGroupId = (channels?.contentTab?.state
          ?.formValues as GroupChangeFormValuesType)?.activeGroup;
        onClose();
        dispatch(setActiveGroupAction(activeGroupId));
        dispatch(documentViewAction__Refresh(true));
        dispatch(
          notificationAction({
            message: t(
              translationPath(lang.dialog.notifications.actionSucceeded)
            )
          })
        );
      }
    )
  ],
  content: GroupChangeContent,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.general.changeGroup))}
      {...props}
    />
  ),
  type: DialogType.GroupChange
};
