import { callAsyncAction } from "core/action";
import { shipmentResendAction } from "core/api/shipment/_action";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import {
  DialogContentType,
  DialogDataGenericData,
  DialogType
} from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import CancelDialog from "../cancelDialog/CancelDialog";

export const resendShipmentDialog: DialogContentType = {
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, dialogProps, onClose, buttonState }) => {
        if (!dialogProps.data) {
          return;
        }
        buttonState.setIsPending(true);

        const onSuccess = () => {
          dispatch(documentViewAction__Refresh(true));
          onClose();
        };
        dispatch(
          callAsyncAction({
            action: shipmentResendAction,
            onError: onClose,
            onSuccess,
            payload: {
              nodeId: (dialogProps.data as DialogDataGenericData)?.id
            }
          })
        );
      }
    )
  ],
  content: (props) => (
    <CancelDialog
      {...props}
      question={t(translationPath(lang.dialog.content.resendShipment))}
    />
  ),
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.resendShipment))}
      {...props}
    />
  ),
  type: DialogType.ResendShipment
};
