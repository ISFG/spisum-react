import { callAsyncAction } from "core/action";
import { documentOwnerCancelActionType } from "core/api/document/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { GenericDocument } from "core/types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { DocumentHandoverContent } from "./DocumentHandoverContent";

export const handoverBackDialog: DialogContentType = {
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, dialogProps, onClose, buttonState }) => {
        if (!dialogProps.data) {
          return;
        }

        const onSuccess = () => {
          onClose();
          dispatch(documentViewAction__Refresh(true));
        };

        const onError = () => {
          buttonState.setIsPending(false);
        };

        buttonState.setIsPending(true);

        dispatch(
          callAsyncAction({
            action: documentOwnerCancelActionType,
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
  content: DocumentHandoverContent,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.handoverBack))}
      {...props}
    />
  ),
  type: DialogType.HandoverDocumentBack
};
