import { callAsyncAction } from "core/action";
import { documentOwnerCancelActionType } from "core/api/document/_actions";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import { GenericDocument } from "core/types";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { DocumentHandoverContent } from "./DocumentHandoverContent";
import NamedTitle from "../../../../core/components/namedTitle";
import React from "react";

export const handoverBackDialog: DialogContentType = {
  actions: [
    {
      color: "primary",
      colorThemeType: "success",
      name: t(translationPath(lang.dialog.buttons.confirm)),
      onClick({ dispatch, dialogData, onClose, buttonState }) {
        if (!dialogData) {
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
              nodeId: (dialogData as GenericDocument).id
            }
          })
        );
      },
      type: "outlined"
    }
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
