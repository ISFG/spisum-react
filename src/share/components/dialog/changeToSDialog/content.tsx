import { callAsyncAction } from "core/action";
import { documentChangeToSAction } from "core/api/document/_actions";
import { fileChangeToSAction } from "core/api/file/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import {
  DialogContentType,
  DialogDataProps,
  DialogType
} from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import { GenericDocument } from "core/types";
import { SpisumNodeTypes } from "enums";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import NamedTitle from "../../../../core/components/namedTitle";
import CancelDialog from "../cancelDialog/CancelDialog";

export const changeToSDialog: DialogContentType = {
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, dialogData, onClose, buttonState }) => {
        if (!dialogData) {
          return;
        }
        buttonState.setIsPending(true);

        const onSuccess = () => {
          onClose();
          dispatch(documentViewAction__Refresh(true));
          (dialogData as DialogDataProps)?.onSuccess?.();
        };

        const onError = () => {
          buttonState.setIsPending(false);
          (dialogData as DialogDataProps)?.onError?.();
        };

        const { nodeType } = dialogData as GenericDocument;

        const action =
          nodeType === SpisumNodeTypes.DocumentRM
            ? documentChangeToSAction
            : nodeType === SpisumNodeTypes.FileRM
            ? fileChangeToSAction
            : undefined;

        if (!action) {
          return;
        }

        const id = (dialogData as GenericDocument)?.properties?.ssl?.ref;

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
