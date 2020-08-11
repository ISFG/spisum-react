import { callAsyncAction } from "core/action";
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
import { SendShipmentContainer } from "./SendShipmentContainer";
import { sendShipmentAction } from "./_actions";

export const sendShipmentDialog: DialogContentType = {
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({
        dialogProps,
        channels,
        buttonState,
        onClose,
        dispatch
      }) => {
        buttonState.setIsPending(true);
        const onError = () => {
          buttonState.setIsPending(false);
        };

        const onSuccess = () => {
          onClose();
        };

        dispatch(
          callAsyncAction({
            action: sendShipmentAction,
            onError,
            onSuccess,
            payload: {
              nodeId: (dialogProps.data as DialogDataGenericData).id,
              shipmentType: (dialogProps.data as DialogDataGenericData)
                .nodeType,
              shipmentsId:
                channels?.contentTab?.state?.selectedComponentsIds || []
            }
          })
        );
      }
    )
  ],
  content: SendShipmentContainer,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.handoverShipmentsToDispatch))}
      {...props}
    />
  ),
  type: DialogType.SendShipment
};
