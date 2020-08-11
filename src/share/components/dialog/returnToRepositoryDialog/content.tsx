import { callAsyncAction } from "core/action";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { GenericDocument } from "core/types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import CancelDialog from "../cancelDialog/CancelDialog";
import { sendModeTypes } from "../sendShipmentDialog/_sagas";
import { returnToRepositoryActionType } from "./_actions";

export const returnToRepositoryDialog: DialogContentType = {
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, dialogProps, onClose, buttonState }) => {
        const dialogPropsTyped = dialogProps.data as GenericDocument;
        if (!dialogPropsTyped) {
          return;
        }

        const onSuccess = () => {
          dispatch(documentViewAction__Refresh(true));
          onClose();
        };

        buttonState.setIsPending(true);

        dispatch(
          callAsyncAction({
            action: returnToRepositoryActionType,
            onError: onClose,
            onSuccess,
            payload: {
              nodeId: dialogPropsTyped.id,
              nodeType: sendModeTypes[dialogPropsTyped.nodeType]
            }
          })
        );
      }
    )
  ],
  content: (props) => (
    <CancelDialog
      {...props}
      question={t(translationPath(lang.dialog.content.returnToRepository))}
    />
  ),
  title: (props) => (
    <NamedTitle text={t(translationPath(lang.general.return))} {...props} />
  ),
  type: DialogType.ReturnToRepository
};
