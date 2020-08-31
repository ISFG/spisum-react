import { callAsyncAction } from "core/action";
import { documentChangeToSAction } from "core/api/document/_actions";
import { fileChangeToSAction } from "core/api/file/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { GenericDocument } from "core/types";
import { SpisumNodeTypes } from "enums";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import CancelDialog from "../cancelDialog/CancelDialog";

export const changeToSDialog: DialogContentType = {
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, dialogProps, onClose, buttonState }) => {
        if (!dialogProps.data) {
          return;
        }
        buttonState.setIsPending(true);

        const onSuccess = () => {
          onClose();
          dispatch(documentViewAction__Refresh(true));
          dialogProps.onSuccess?.();
        };

        const onError = () => {
          buttonState.setIsPending(false);
          dialogProps.onError?.();
        };

        const { nodeType } = dialogProps.data as GenericDocument;

        const action =
          nodeType === SpisumNodeTypes.Document
            ? documentChangeToSAction
            : nodeType === SpisumNodeTypes.File
            ? fileChangeToSAction
            : undefined;

        if (!action) {
          return;
        }

        const id = (dialogProps.data as GenericDocument)?.id;

        if (!id) {
          return;
        }

        dispatch(
          callAsyncAction({
            action,
            onError,
            onSuccess,
            payload: {
              nodeId: id
            }
          })
        );
      }
    )
  ],
  content: (props) => (
    <CancelDialog
      {...props}
      question={t(translationPath(lang.dialog.content.changeToS))}
    />
  ),
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.changeToS))}
      {...props}
    />
  ),
  type: DialogType.ChangeToS
};
