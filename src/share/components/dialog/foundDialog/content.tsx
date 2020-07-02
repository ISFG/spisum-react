import { callAsyncAction } from "core/action";
import { documentFoundActionType } from "core/api/document/_actions";
import { foundFilesAction } from "core/api/file/_actions";
import {
  DialogContentType,
  DialogDataProps,
  DialogType
} from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { SpisumNodeTypes } from "enums";
import { groupBy } from "lodash";
import { classPath, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { FoundContent } from "./FoundDialog";
import NamedTitle from "../../../../core/components/namedTitle";
import React from "react";

export const foundDialog: DialogContentType = {
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

        const nodes = dialogData as GenericDocument[];
        const groupedNodes = groupBy(
          nodes,
          classPath(genericDocumentProxy.nodeType).path
        );

        if (groupedNodes[SpisumNodeTypes.Document]) {
          const documentsIds = groupedNodes[SpisumNodeTypes.Document].map(
            ({ id }) => id
          );

          dispatch(
            callAsyncAction({
              action: documentFoundActionType,
              onError,
              onSuccess,
              payload: {
                body: {
                  ids: documentsIds
                }
              }
            })
          );
          buttonState.setIsPending(true);
        }

        if (groupedNodes[SpisumNodeTypes.File]) {
          const fileIds = groupedNodes[SpisumNodeTypes.File].map(
            ({ id }) => id
          );

          dispatch(
            callAsyncAction({
              action: foundFilesAction,
              onError,
              onSuccess,
              payload: {
                body: {
                  ids: fileIds
                }
              }
            })
          );
          buttonState.setIsPending(true);
        }
      },
      type: "outlined"
    }
  ],
  content: FoundContent,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.general.foundConfirmation))}
      {...props}
    />
  ),
  type: DialogType.FoundDialog
};
