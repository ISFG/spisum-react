import { callAsyncAction } from "core/action";
import { documentFoundActionType } from "core/api/document/_actions";
import { foundFilesAction } from "core/api/file/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { SpisumNodeTypes } from "enums";
import { groupBy } from "lodash";
import { default as React } from "react";
import { classPath, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { FoundContent } from "./FoundDialog";

export const foundDialog: DialogContentType = {
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.form.confirm)),
      ({ dispatch, channels, dialogProps, onClose, buttonState }) => {
        const onSuccess = () => {
          onClose();
          dispatch(documentViewAction__Refresh(true));
          dialogProps.onSuccess?.();
        };

        const onError = () => {
          buttonState.setIsPending(false);
          dialogProps.onError?.();
        };

        const nodes = dialogProps.data as GenericDocument[];
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
      }
    )
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
