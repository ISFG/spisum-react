import { callAsyncAction } from "core/action";
import { documentBorrowActionType } from "core/api/document/_actions";
import { fileBorrowAction } from "core/api/file/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import {
  DialogContentPropsType,
  DialogType
} from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import { GenericDocument } from "core/types";
import { SpisumNodeTypes } from "enums";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import NamedTitle from "../../../../core/components/namedTitle";
import { BorrowDialog } from "./BorrowDialog";
import { BorrowFormValues } from "./_types";

export const borrowDialog = {
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, channels, dialogData, onClose, buttonState }) => {
        const onSuccess = () => {
          dispatch(documentViewAction__Refresh(true));
          onClose();
        };

        const onError = () => {
          buttonState.setIsPending(false);
        };

        buttonState.setIsPending(true);

        const { group, user } = channels.contentTab.state
          ?.formValues as BorrowFormValues;

        const { nodeType, id } = dialogData as GenericDocument;

        const action =
          nodeType === SpisumNodeTypes.Document
            ? documentBorrowActionType
            : nodeType === SpisumNodeTypes.File
            ? fileBorrowAction
            : undefined;

        if (!action) {
          return;
        }

        dispatch(
          callAsyncAction({
            action,
            onError,
            onSuccess,
            payload: {
              body: {
                group,
                user
              },
              nodeId: id
            }
          })
        );
      }
    )
  ],
  content: BorrowDialog,
  title: (props: DialogContentPropsType) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.borrow))}
      {...props}
    />
  ),
  type: DialogType.Borrow
};
