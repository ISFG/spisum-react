import { callAsyncAction } from "core/action";
import { conceptUpdateActionType } from "core/api/concept/_actions";
import { NodeChildAssociationEntry, SslConcept } from "core/api/models";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { CommentsTab } from "core/components/dialog/tabs/comments";
import { HistoryTab } from "core/components/dialog/tabs/history";
import { VersionTab } from "core/components/dialog/tabs/version";
import { DialogDataProps, DialogType } from "core/components/dialog/_types";
import { documentViewAction__UpdateItem } from "core/components/documentView/_actions";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import NamedTitle from "../../../../core/components/namedTitle";
import { createDocumentDialog } from "../baseDocumentDialog/documentDialogFactory";
import { ConceptComponentsTab } from "../createConceptDialog/ConceptComponentsTab";
import { MetadataFormTab } from "./MetadataFormTab";

export const conceptDetailsDialog = createDocumentDialog({
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.form.edit)),
      ({ dispatch, dialogData, onClose, buttonState, channels }) => {
        const onSuccess = (response: NodeChildAssociationEntry<SslConcept>) => {
          for (const key in channels) {
            if (!channels.hasOwnProperty(key)) continue;
            channels[key].setIsSaved(true);
          }
          buttonState.setIsPending(false);
          dispatch(documentViewAction__UpdateItem(response));
          onClose();
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
              nodeId: channels.Metadata?.state?.id
            }
          })
        );
      }
    )
  ],
  tabs: [
    {
      content: MetadataFormTab,
      label: t(translationPath(lang.dialog.tabs.metadata))
    },
    {
      content: ConceptComponentsTab,
      label: t(translationPath(lang.dialog.tabs.components))
    },
    {
      content: VersionTab,
      label: t(translationPath(lang.dialog.tabs.version))
    },
    {
      content: CommentsTab,
      label: t(translationPath(lang.dialog.tabs.notes))
    },
    {
      content: HistoryTab,
      label: t(translationPath(lang.dialog.tabs.history))
    }
  ],
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.conceptDetails))}
      {...props}
    />
  ),
  type: DialogType.ConceptDetails
});
