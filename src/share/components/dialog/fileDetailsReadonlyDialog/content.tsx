import { ShipmentTab } from "core/components/dialog/tabs/shipment";
import { TableOfContentsTab } from "core/components/dialog/tabs/tableOfContents";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { CommentsTab } from "../../../../core/components/dialog/tabs/comments";
import { HistoryTab } from "../../../../core/components/dialog/tabs/history";
import { ProcessingOrClosingTab } from "../../../../core/components/dialog/tabs/processingOrClosing/ProcessingOrClosingTab";
import { SaveAndDiscardTab } from "../../../../core/components/dialog/tabs/saveAndDiscard/SaveAndDiscardTab";
import NamedTitle from "../../../../core/components/namedTitle";
import { GenericDocument } from "../../../../core/types";
import { createDocumentDialog } from "../baseDocumentDialog/documentDialogFactory";
import MetadataFormTab from "../fileDetailsDialog/MetadataFormTab";

export const fileDetailsReadonlyDialog: DialogContentType = createDocumentDialog(
  {
    tabs: [
      {
        content: MetadataFormTab,
        label: t(translationPath(lang.dialog.tabs.metadata))
      },
      {
        content: TableOfContentsTab,
        label: t(translationPath(lang.dialog.tabs.content))
      },
      {
        content: ProcessingOrClosingTab,
        filter: ({ dialogData }) => {
          const { state } =
            (dialogData as GenericDocument)?.properties?.ssl || {};
          return ProcessingOrClosingTab.filter(state);
        },
        label: t(translationPath(lang.dialog.tabs.processOrClose))
      },
      {
        content: ShipmentTab,
        label: t(translationPath(lang.dialog.tabs.shipment))
      },
      {
        content: SaveAndDiscardTab,
        filter: ({ dialogData }) => {
          const { state } =
            (dialogData as GenericDocument)?.properties?.ssl || {};

          return SaveAndDiscardTab.filter(state);
        },
        label: t(translationPath(lang.dialog.tabs.saveAndDiscard))
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
        text={t(translationPath(lang.dialog.title.fileDetail))}
        {...props}
      />
    ),
    type: DialogType.FileDetailsReadonly
  }
);
