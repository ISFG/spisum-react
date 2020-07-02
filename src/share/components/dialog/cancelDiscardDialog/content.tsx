import React from "react";
import { callAsyncAction } from "core/action";
import { documentCancelDiscardActionType } from "core/api/document/_actions";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { GenericDocument } from "core/types";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "../../../../core/components/namedTitle";
import CancelDialog from "../cancelDialog/CancelDialog";
import { SpisumNodeTypes } from "../../../../enums";
import { fileCancelDiscardActionType } from "../../../../core/api/file/_actions";

const actionDiscardList = {
  [SpisumNodeTypes.DocumentRM]: documentCancelDiscardActionType,
  [SpisumNodeTypes.FileRM]: fileCancelDiscardActionType
};

export const cancelDiscardDialog: DialogContentType = {
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, dialogData, onClose, buttonState }) => {
        if (!dialogData) {
          return;
        }
        const nodeType = (dialogData as GenericDocument).nodeType;
        const id = (dialogData as GenericDocument)?.properties?.ssl?.ref;

        if (!id || !actionDiscardList.hasOwnProperty(nodeType)) {
          return;
        }
        const action = actionDiscardList[nodeType];
        const onSuccess = () => {
          dispatch(documentViewAction__Refresh(true));
          onClose();
        };

        buttonState.setIsPending(true);

        dispatch(
          callAsyncAction({
            action,
            onError: onClose,
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
      question={t(translationPath(lang.dialog.content.cancelDiscard))}
    />
  ),
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.general.cancelDiscard))}
      {...props}
    />
  ),
  type: DialogType.CancelDiscardDialog
};
