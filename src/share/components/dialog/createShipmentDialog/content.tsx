import { callAsyncAction } from "core/action";
import { createShipmentsAction } from "core/api/node/_actions";
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
import { CreateShipment } from "./CreateShipment";

export const createShipmentDialog: DialogContentType = {
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({
        onClose,
        dispatch,
        channels,
        buttonState,
        dialogProps
      }) => {
        const metaState = channels?.contentTab?.state;

        if (!metaState) return;
        if (metaState.preventAction) return;
        buttonState.setIsPending(true);
        const onError = () => {
          buttonState.setIsPending(false);
        };

        const data = dialogProps.data as DialogDataGenericData;

        dispatch(
          callAsyncAction({
            action: createShipmentsAction,
            onError,
            onSuccess: onClose,
            payload: {
              ...metaState?.formValues,
              components: metaState?.selectedComponentsIds,
              nodeId: data?.id,
              nodeType: data?.nodeType
            }
          })
        );
      }
    )
  ],
  content: CreateShipment,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.general.createShipment))}
      {...props}
    />
  ),
  type: DialogType.CreateShipment
};
