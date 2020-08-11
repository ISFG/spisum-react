import { callAsyncAction } from "core/action";
import { evidenceSubmitToRepository } from "core/api/evidence/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import {
  DialogContentType,
  DialogDataGenericData,
  DialogType
} from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { GenericDocument } from "core/types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import SubmitToDialogContent from "./SubmitToRepositoryDialog";
import { SubmitToRepositoryFormValuesType } from "./_types";

export const submitToDialog: DialogContentType = {
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, dialogProps, onClose, buttonState, channels }) => {
        if (!dialogProps.data) {
          return;
        }
        const onSuccess = () => {
          dispatch(documentViewAction__Refresh(true));
          onClose();
        };

        buttonState.setIsPending(true);

        const data = dialogProps.data as DialogDataGenericData;

        const activeGroupId = (channels?.contentTab?.state
          ?.formValues as SubmitToRepositoryFormValuesType)?.activeGroup;
        const ids = (data?.selected as GenericDocument[]).map(
          (select: GenericDocument) => select.id
        );
        const body = {
          group: activeGroupId,
          ids
        };

        dispatch(
          callAsyncAction({
            action: evidenceSubmitToRepository,
            onError: onClose,
            onSuccess,
            payload: {
              body,
              entityType: (dialogProps.data as DialogDataGenericData)
                ?.entityType
            }
          })
        );
      }
    )
  ],
  content: SubmitToDialogContent,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.submitToRepository))}
      {...props}
    />
  ),
  type: DialogType.SubmitTo
};
