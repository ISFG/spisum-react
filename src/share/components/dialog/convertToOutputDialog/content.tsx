import { callAsyncAction } from "core/action";
import { ApiURL } from "core/apiURL";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import {
  DialogContentType,
  DialogDataProps,
  DialogType
} from "core/components/dialog/_types";
import { documentSaveReasonFormActionType } from "core/components/reasonForm/_actions";
import { ReasonFormValues } from "core/components/reasonForm/_types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import NamedTitle from "../../../../core/components/namedTitle";
import ConvertToOutputFormatDialog from "./ConvertToOutputFormatDialog";

export const convertToOutputFormatDialog: DialogContentType = {
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, channels, dialogData, onClose, buttonState }) => {
        const data = dialogData as DialogDataProps;
        const componentId = data?.componentId;

        buttonState.setIsPending(true);

        const onSuccess = () => {
          if (data?.onSuccess) data.onSuccess();
          onClose();
        };

        const onError = () => {
          buttonState.setIsPending(false);
        };
        const url = ApiURL.DOCUMENT_CONVERT.replace(
          ":componentId",
          componentId as string
        );

        dispatch(
          callAsyncAction({
            action: documentSaveReasonFormActionType,
            onError,
            onSuccess,
            payload: {
              body: {
                reason: (channels?.contentTab?.state
                  ?.formValues as ReasonFormValues).reason
              },
              nodeId: (dialogData as DialogDataProps).id,
              url
            }
          })
        );
      }
    )
  ],
  content: ConvertToOutputFormatDialog,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.convertToOutputFormat))}
      {...props}
    />
  ),
  type: DialogType.ConvertToOutput
};