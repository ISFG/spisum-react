import { callAsyncAction } from "core/action";
import { documentLostDestroyedActionType } from "core/api/document/_actions";
import { lostDestroyedFileAction } from "core/api/file/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { ReasonFormValues } from "core/components/reasonForm/_types";
import { GenericDocument } from "core/types";
import { SpisumNodeTypes } from "enums";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { LostDestroyedContent } from "./LostDestroyedDialog";

export const lostDestroyedDialog: DialogContentType = {
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.form.confirm)),
      ({ dispatch, channels, dialogProps, onClose, buttonState }) => {
        const onSuccess = () => {
          onClose();
          dispatch(documentViewAction__Refresh(true));
          buttonState.setIsPending(false);
          dialogProps.onSuccess?.();
        };

        const onError = () => {
          buttonState.setIsPending(false);
          dialogProps.onError?.();
        };

        const { nodeType, id } = dialogProps.data as GenericDocument;

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
      }
    )
  ],
  content: LostDestroyedContent,
  title: (props) => (
    <NamedTitle text={t(translationPath(lang.general.damaged))} {...props} />
  ),
  type: DialogType.LostDestroyed
};
