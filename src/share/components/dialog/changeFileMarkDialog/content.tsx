import { callAsyncAction } from "core/action";
import { documentChangeFileMarkAction } from "core/api/document/_actions";
import { fileChangeFileMarkAction } from "core/api/file/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { isFile, isGenericDocument } from "core/types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { ChangeFileMarkDialogContent } from "./ChangeFileMarkDialogContent";
import { ChangeFileMarkFormValues } from "./_types";

export const changeFileMarkDialog: DialogContentType = {
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, dialogData, onClose, buttonState, channels }) => {
        if (!isGenericDocument(dialogData)) {
          return;
        }

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
            action: isFile(dialogData)
              ? fileChangeFileMarkAction
              : documentChangeFileMarkAction,
            onError,
            onSuccess,
            payload: {
              fileMark: (channels.contentTab.state
                ?.formValues as ChangeFileMarkFormValues).fileMark,
              nodeId: dialogData.id
            }
          })
        );
      }
    )
  ],
  content: ChangeFileMarkDialogContent,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.general.changeFileMark))}
      {...props}
    />
  ),
  type: DialogType.ChangeFileMark
};
