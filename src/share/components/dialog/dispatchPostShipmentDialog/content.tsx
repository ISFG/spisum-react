import { callAsyncAction } from "core/action";
import { dispatchPostShipment } from "core/api/shipment/_action";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import { GenericDocument } from "core/types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import NamedTitle from "../../../../core/components/namedTitle";
import DispatchPostShipmentDialog from "./DispatchPostShipmentDialog";
import { DispatchPostShipmentFormValues } from "./_types";

export const dispatchPostShipmentDialog: DialogContentType = {
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, channels, dialogData, onClose, buttonState }) => {
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
            action: dispatchPostShipment,
            onError,
            onSuccess,
            payload: {
              body: {
                postItemId: (channels?.contentTab?.state
                  ?.formValues as DispatchPostShipmentFormValues).postItemId,
                postItemNumber: (channels?.contentTab?.state
                  ?.formValues as DispatchPostShipmentFormValues).postItemNumber
              },
              nodeId: (dialogData as GenericDocument).id
            }
          })
        );
      }
    )
  ],
  content: DispatchPostShipmentDialog,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.dispatchShipment))}
      {...props}
    />
  ),
  type: DialogType.DispatchPostShipment
};
