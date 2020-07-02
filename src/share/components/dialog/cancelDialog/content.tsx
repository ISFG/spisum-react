import React from "react";
import { callAsyncAction } from "core/action";
import { documentCancelActionType } from "core/api/document/_actions";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { GenericDocument } from "core/types";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import CancelDialog from "./CancelDialog";
import NamedTitle from "../../../../core/components/namedTitle";

export const cancelDialog: DialogContentType = {
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, dialogData, onClose, buttonState }) => {
        if (!dialogData) {
          return;
        }

        const onSuccess = () => {
          dispatch(documentViewAction__Refresh(true));
          onClose();
        };

        buttonState.setIsPending(true);

        dispatch(
          callAsyncAction({
            action: documentCancelActionType,
            onError: onClose,
            onSuccess,
            payload: {
              nodeId: (dialogData as GenericDocument).id
            }
          })
        );
      }
    )
  ],
  content: (props) => (
    <CancelDialog
      {...props}
      question={t(translationPath(lang.dialog.content.notRegisterQuestion))}
    />
  ),
  title: (props) => (
    <NamedTitle text={t(translationPath(lang.general.cancel))} {...props} />
  ),
  type: DialogType.Cancel
};
