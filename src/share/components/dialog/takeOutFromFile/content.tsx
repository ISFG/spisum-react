import { callAsyncAction } from "core/action";
import { removeFromFileAction } from "core/api/file/_actions";
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
import { TakeOutFromFile } from "./TakeOutFromFile";

export const takeOutFromFileDialog: DialogContentType = {
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({
        dispatch,
        dialogProps,
        onClose,
        buttonState,
        channels
      }) => {
        const componentsIds =
          channels?.contentTab?.state?.selectedComponentsIds;

        const onSuccess = () => {
          dispatch(documentViewAction__Refresh(true));
          onClose();
        };

        buttonState.setIsPending(true);
        dispatch(
          callAsyncAction({
            action: removeFromFileAction,
            onError: onClose,
            onSuccess,
            payload: {
              componentsIds,
              nodeId: (dialogProps.data as DialogDataGenericData)?.id
            }
          })
        );
      }
    )
  ],
  content: TakeOutFromFile,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.takingOutFromFile))}
      {...props}
    />
  ),
  type: DialogType.TakeOutFromFile
};
