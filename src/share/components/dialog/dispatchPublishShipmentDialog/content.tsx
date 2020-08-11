import { callAsyncAction } from "core/action";
import { dispatchPublishShipment } from "core/api/shipment/_action";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { GenericDocument } from "core/types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import CancelDialog from "../cancelDialog/CancelDialog";

export const dispatchPublishShipmentDialog: DialogContentType = {
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({
        dispatch,
        channels,
        dialogProps,
        onClose,
        buttonState
      }) => {
        buttonState.setIsPending(true);

        const onSuccess = () => {
          dispatch(documentViewAction__Refresh(true));
          onClose();
        };

        const onError = () => {
          buttonState.setIsPending(false);
        };

        dispatch(
          callAsyncAction({
            action: dispatchPublishShipment,
            onError,
            onSuccess,
            payload: {
              nodeId: (dialogProps.data as GenericDocument).id
            }
          })
        );
      }
    )
  ],
  content: (props) => (
    <CancelDialog
      {...props}
      question={t(translationPath(lang.dialog.content.dispatchPublishShipment))}
    />
  ),
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.dispatchShipment))}
      {...props}
    />
  ),
  type: DialogType.DispatchPublishShipment
};
