import { callAsyncAction } from "core/action";
import { documentChangeToAAction } from "core/api/document/_actions";
import { fileChangeToAAction } from "core/api/file/_actions";
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

export const changeToADialog: DialogContentType = {
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
            ? documentChangeToAAction
            : nodeType === SpisumNodeTypes.FileRM
            ? fileChangeToAAction
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
      question={t(translationPath(lang.dialog.content.changeToA))}
    />
  ),
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.changeToA))}
      {...props}
    />
  ),
  type: DialogType.ChangeToA
};
