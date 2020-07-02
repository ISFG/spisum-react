import { callAsyncAction } from "core/action";
import { nodeCancelShipmentAction } from "core/api/node/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import {
  DialogContentType,
  DialogDataProps,
  DialogType
} from "core/components/dialog/_types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import NamedTitle from "../../../../core/components/namedTitle";
import CancelDialog from "../cancelDialog/CancelDialog";

export const cancelShipmentDialog: DialogContentType = {
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, dialogData, onClose, buttonState }) => {
        if (!dialogData) {
          return;
        }
        buttonState.setIsPending(true);

        dispatch(
          callAsyncAction({
            action: nodeCancelShipmentAction,
            onError: onClose,
            onSuccess: onClose,
            payload: {
              shipmentId: [(dialogData as DialogDataProps)?.id]
            }
          })
        );
      }
    )
  ],
  content: (props) => (
    <CancelDialog
      {...props}
      question={t(translationPath(lang.dialog.content.cancelShipmentSending))}
    />
  ),
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.general.deleteShipment))}
      {...props}
    />
  ),
  type: DialogType.CancelShipment
};
