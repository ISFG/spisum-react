import { callAsyncAction } from "core/action";
import { conceptUpdateActionType } from "core/api/concept/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { CommentsTab } from "core/components/dialog/tabs/comments";
import { DialogContentType, DialogDataProps, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import NamedTitle from "../../../../core/components/namedTitle";
import { createDocumentDialog } from "../baseDocumentDialog/documentDialogFactory";
import { ConceptComponentsTab } from "./ConceptComponentsTab";
import { MetaDataTab } from "./MetaDataTab";

export const evidenceCreateConceptDialog: DialogContentType = createDocumentDialog({
  actions: [
    secondaryAction(t(translationPath(lang.dialog.form.confirm)), ({ dispatch, channels, dialogData, onClose, buttonState }) => {
      const onSuccess = () => {
        onClose();
        dispatch(documentViewAction__Refresh(true));
        (dialogData as DialogDataProps)?.onSuccess?.();
      };

      const onError = () => {
        buttonState.setIsPending(false);
        (dialogData as DialogDataProps)?.onError?.();
      };

      buttonState.setIsPending(true);

      dispatch(
        callAsyncAction({
          action: conceptUpdateActionType,
          onError,
          onSuccess,
          payload: {
            body: channels.Metadata?.state?.formValues,
            nodeId: channels.Metadata?.state?.id,
          }
        })
      );
    })
  ],
  tabs: [
    {
      content: MetaDataTab,
      label: t(translationPath(lang.dialog.tabs.metadata))
    },
    {
      content: ConceptComponentsTab,
      label: t(translationPath(lang.dialog.tabs.components))
    },
    {
      content: CommentsTab,
      label: t(translationPath(lang.dialog.tabs.notes))
    }
  ],
  title: (props) => (
    <NamedTitle text={t(translationPath(lang.general.addConcept))} {...props} />
  ),
  type: DialogType.CreateConcept
});
