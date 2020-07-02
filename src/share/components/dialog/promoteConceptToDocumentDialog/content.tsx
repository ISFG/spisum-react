import { callAsyncAction } from "core/action";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import {
  DialogContentPropsType,
  DialogType
} from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { GenericDocument } from "core/types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { PromoteConceptToDocumentContent } from "./PromoteConceptToDocumentContent";
import { promoteConceptToDocumentAction } from "./_actions";

export const promoteConceptToDocumentDialog = {
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, channels, dialogData, onClose, buttonState }) => {
        const formValues = channels?.contentTab?.state?.formValues;
        if (!formValues) return;
        const onSuccess = () => {
          dispatch(documentViewAction__Refresh(true));
          onClose();
        };

        const onError = () => {
          buttonState.setIsPending(false);
        };

        buttonState.setIsPending(true);

        dispatch(
          callAsyncAction({
            action: promoteConceptToDocumentAction,
            onError,
            onSuccess,
            payload: {
              body: formValues,
              nodeId: (dialogData as GenericDocument).id
            }
          })
        );
      }
    )
  ],
  content: PromoteConceptToDocumentContent,
  title: (props: DialogContentPropsType) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.promoteConceptToDocument))}
      {...props}
    />
  ),
  type: DialogType.PromoteConceptToDocument
};
