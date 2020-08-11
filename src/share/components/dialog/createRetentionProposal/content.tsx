import { callAsyncAction } from "core/action";
import { createRetentionProposalAction } from "core/api/retention/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { GenericDocument } from "core/types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { CreateRetentionProposalContent } from "./CreateRetentionProposalDialog";
import { RetentionProposalValues } from "./_types";

export const createRetentionProposalDialog: DialogContentType = {
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.form.confirm)),
      ({
        dispatch,
        channels,
        dialogProps,
        onClose,
        buttonState
      }) => {
        const ids = (dialogProps.data as GenericDocument[]).map(
          (selected) => selected?.properties?.ssl?.ref
        );

        if (!ids.length) return;

        const onSuccess = () => {
          onClose();
          dispatch(documentViewAction__Refresh(true));
          buttonState.setIsPending(false);
        };

        const onError = () => {
          buttonState.setIsPending(false);
        };

        buttonState.setIsPending(true);

        const formValues = channels.contentTab?.state
          ?.formValues as RetentionProposalValues;

        dispatch(
          callAsyncAction({
            action: createRetentionProposalAction,
            onError,
            onSuccess,
            payload: {
              ids,
              name: formValues.name
            }
          })
        );
      }
    )
  ],
  content: CreateRetentionProposalContent,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.general.createShreddingProposal))}
      {...props}
    />
  ),
  type: DialogType.CreateRetentionProposal
};
