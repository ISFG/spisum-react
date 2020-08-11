import { callAsyncAction } from "core/action";
import { ApiURL } from "core/apiURL";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { documentSaveReasonFormActionType } from "core/components/reasonForm/_actions";
import { ReasonFormValues } from "core/components/reasonForm/_types";
import { GenericDocument } from "core/types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import FileOpenDialog from "./FileOpenDialog";

export const openFileDialog: DialogContentType = {
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
            action: documentSaveReasonFormActionType,
            onError,
            onSuccess,
            payload: {
              body: {
                reason: (channels?.contentTab?.state
                  ?.formValues as ReasonFormValues).reason
              },
              nodeId: (dialogProps.data as GenericDocument).id,
              url: ApiURL.FILE_OPEN
            }
          })
        );
      }
    )
  ],
  content: FileOpenDialog,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.openFile))}
      {...props}
    />
  ),
  type: DialogType.OpenFile
};
