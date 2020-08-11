import { callAsyncAction } from "core/action";
import { documentCancelDiscardActionType } from "core/api/document/_actions";
import { fileCancelDiscardActionType } from "core/api/file/_actions";
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

const actionDiscardList = {
  [SpisumNodeTypes.DocumentRM]: documentCancelDiscardActionType,
  [SpisumNodeTypes.FileRM]: fileCancelDiscardActionType
};

export const cancelDiscardDialog: DialogContentType = {
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, dialogProps, onClose, buttonState }) => {
        if (!dialogProps.data) {
          return;
        }
        const nodeType = (dialogProps.data as GenericDocument).nodeType;
        const id = (dialogProps.data as GenericDocument)?.properties?.ssl?.ref;

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
