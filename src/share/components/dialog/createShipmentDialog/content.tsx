import { callAsyncAction } from "core/action";
import { createShipmentsAction } from "core/api/node/_actions";
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
import { CreateShipment } from "./CreateShipment";

export const createShipmentDialog: DialogContentType = {
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ onClose, dispatch, channels, buttonState, dialogData }) => {
        const metaState = channels?.contentTab?.state;

        if (!metaState) return;
        if (metaState.preventAction) return;
        buttonState.setIsPending(true);
        const onError = () => {
          buttonState.setIsPending(false);
        };

        dispatch(
          callAsyncAction({
            action: createShipmentsAction,
            onError,
            onSuccess: onClose,
            payload: {
              ...metaState?.formValues,
              components: metaState?.selectedComponentsIds,
              nodeId: (dialogData as DialogDataProps)?.id,
              nodeType: (dialogData as DialogDataProps)?.nodeType
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
