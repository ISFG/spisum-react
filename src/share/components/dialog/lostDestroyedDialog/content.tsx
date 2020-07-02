import { callAsyncAction } from "core/action";
import { documentLostDestroyedActionType } from "core/api/document/_actions";
import { lostDestroyedFileAction } from "core/api/file/_actions";
import {
  DialogContentType,
  DialogDataProps,
  DialogType
} from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import { ReasonFormValues } from "core/components/reasonForm/_types";
import { GenericDocument } from "core/types";
import { SpisumNodeTypes } from "enums";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { LostDestroyedContent } from "./LostDestroyedDialog";
import NamedTitle from "../../../../core/components/namedTitle";
import React from "react";

export const lostDestroyedDialog: DialogContentType = {
  actions: [
    {
      color: "secondary",
      name: t(translationPath(lang.dialog.form.confirm)),
      onClick: ({ dispatch, channels, dialogData, onClose, buttonState }) => {
        const onSuccess = () => {
          onClose();
          dispatch(documentViewAction__Refresh(true));
          buttonState.setIsPending(false);
          (dialogData as DialogDataProps)?.onSuccess?.();
        };

        const onError = () => {
          buttonState.setIsPending(false);
          (dialogData as DialogDataProps)?.onError?.();
        };

        const { nodeType, id } = dialogData as GenericDocument;

        const action =
          nodeType === SpisumNodeTypes.Document
            ? documentLostDestroyedActionType
            : nodeType === SpisumNodeTypes.File
            ? lostDestroyedFileAction
            : undefined;

        if (!action) {
          return;
        }

        buttonState.setIsPending(true);

        dispatch(
          callAsyncAction({
            action,
            onError,
            onSuccess,
            payload: {
              body: {
                reason: (channels.contentTab?.state
                  ?.formValues as ReasonFormValues).reason
              },
              nodeId: id
            }
          })
        );
      },
      type: "outlined"
    }
  ],
  content: LostDestroyedContent,
  title: (props) => (
    <NamedTitle text={t(translationPath(lang.general.damaged))} {...props} />
  ),
  type: DialogType.LostDestroyed
};
