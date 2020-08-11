import { callAsyncAction } from "core/action";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { ReasonFormValues } from "core/components/reasonForm/_types";
import { GenericDocument } from "core/types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import ReturnShipmentDialog from "./ReturnShipmentDialog";
import { returnShipmentAction } from "./_actions";

export const returnShipmentDialog: DialogContentType = {
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
            action: returnShipmentAction,
            onError,
            onSuccess,
            payload: {
              nodeId: (dialogProps.data as GenericDocument).id,
              reason: (channels?.contentTab?.state
                ?.formValues as ReasonFormValues).reason
            }
          })
        );
      }
    )
  ],
  content: ReturnShipmentDialog,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.general.returnShipment))}
      {...props}
    />
  ),
  type: DialogType.ReturnShipment
};
