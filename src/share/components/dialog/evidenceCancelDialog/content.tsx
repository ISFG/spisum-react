import { callAsyncAction } from "core/action";
import { conceptCancelActionType } from "core/api/concept/_actions";
import { documentCancelActionType } from "core/api/document/_actions";
import { cancelFileAction } from "core/api/file/_actions";
import {
  DialogContentType,
  DialogDataProps,
  DialogType
} from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import { ReasonFormValues } from "core/components/reasonForm/_types";
import { GenericDocument } from "core/types";
import { SpisumNodeTypes } from "enums";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import NamedTitle from "../../../../core/components/namedTitle";
import { CancelDialogContent } from "./CancelDialog";

export const evidenceCancelDialog: DialogContentType = {
  actions: [
    {
      color: "secondary",
      name: t(translationPath(lang.dialog.form.confirm)),
      onClick: ({ dispatch, channels, dialogData, onClose, buttonState }) => {
        const onSuccess = () => {
          onClose();
          dispatch(documentViewAction__Refresh(true));
          (dialogData as DialogDataProps)?.onSuccess?.();
        };

        const onError = () => {
          buttonState.setIsPending(false);
          (dialogData as DialogDataProps)?.onError?.();
        };

        const { nodeType, id } = dialogData as GenericDocument;

        const action =
          nodeType === SpisumNodeTypes.Document
            ? documentCancelActionType
            : nodeType === SpisumNodeTypes.File
            ? cancelFileAction
            : nodeType === SpisumNodeTypes.Concept
            ? conceptCancelActionType
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
  content: CancelDialogContent,
  title: (props) => (
    <NamedTitle text={t(translationPath(lang.general.cancel))} {...props} />
  ),
  type: DialogType.CancelDialog
};
