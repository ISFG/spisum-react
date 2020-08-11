import { callAsyncAction } from "core/action";
import { documentShreddingDiscardActionType } from "core/api/document/_actions";
import { fileShreddingDiscardAction } from "core/api/file/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { GenericDocument } from "core/types";
import { SpisumNodeTypes } from "enums";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { ShreddingDiscardContent } from "./ShreddingDiscardContent";
import { ShreddingDiscardFormValues } from "./_types";

export const shreddingDiscardDialog: DialogContentType = {
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

        const { nodeType } = dialogProps.data as GenericDocument;

        const action =
          nodeType === SpisumNodeTypes.DocumentRM
            ? documentShreddingDiscardActionType
            : nodeType === SpisumNodeTypes.FileRM
            ? fileShreddingDiscardAction
            : undefined;

        if (!action) {
          return;
        }

        const id = (dialogProps.data as GenericDocument)?.properties?.ssl?.ref;

        if (!id) {
          return;
        }

        dispatch(
          callAsyncAction({
            action,
            onError,
            onSuccess,
            payload: {
              body: {
                date: (channels.contentTab?.state
                  ?.formValues as ShreddingDiscardFormValues).date,
                reason: (channels.contentTab?.state
                  ?.formValues as ShreddingDiscardFormValues).reason
              },
              nodeId: id
            }
          })
        );
      }
    )
  ],
  content: ShreddingDiscardContent,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.shreddingDiscard))}
      {...props}
    />
  ),
  type: DialogType.ShreddingDiscard
};
