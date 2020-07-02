import { callAsyncAction } from "core/action";
import { evidenceSubmitToRepository } from "core/api/evidence/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import NamedTitle from "../../../../core/components/namedTitle";
import SubmitToDialogContent from "./SubmitToRepositoryDialog";
import {
  SubmitToRepositoryDialogType,
  SubmitToRepositoryFormValuesType
} from "./_types";

export const submitToDialog: DialogContentType = {
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, dialogData, onClose, buttonState, channels }) => {
        if (!dialogData) {
          return;
        }
        const onSuccess = () => {
          dispatch(documentViewAction__Refresh(true));
          onClose();
        };

        buttonState.setIsPending(true);

        const activeGroupId = (channels?.contentTab?.state
          ?.formValues as SubmitToRepositoryFormValuesType)?.activeGroup;
        const ids = (dialogData as SubmitToRepositoryDialogType).selected.map(
          (select) => select.id
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
              entityType: (dialogData as SubmitToRepositoryDialogType)
                ?.onSubmitActionName
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
