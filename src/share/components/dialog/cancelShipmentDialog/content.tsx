import { callAsyncAction } from "core/action";
import { nodeCancelShipmentAction } from "core/api/node/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import {
  DialogContentType,
  DialogDataGenericData,
  DialogType
} from "core/components/dialog/_types";
import NamedTitle from "core/components/namedTitle";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import CancelDialog from "../cancelDialog/CancelDialog";

export const cancelShipmentDialog: DialogContentType = {
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, dialogProps, onClose, buttonState }) => {
        if (!dialogProps.data) {
          return;
        }
        buttonState.setIsPending(true);

        dispatch(
          callAsyncAction({
            action: nodeCancelShipmentAction,
            onError: onClose,
            onSuccess: onClose,
            payload: {
              shipmentId: [(dialogProps.data as DialogDataGenericData)?.id]
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
