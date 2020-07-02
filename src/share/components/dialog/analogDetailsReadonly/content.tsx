import { DocumentReadonly } from "core/api/document/_types";
import { CommentsTab } from "core/components/dialog/tabs/comments";
import { ComponentsTab } from "core/components/dialog/tabs/components";
import { HistoryTab } from "core/components/dialog/tabs/history";
import { SaveAndDiscardTab } from "core/components/dialog/tabs/saveAndDiscard/SaveAndDiscardTab";
import { SettleTab } from "core/components/dialog/tabs/settle/SettleTab";
import { ShipmentTab } from "core/components/dialog/tabs/shipment";
import { VersionTab } from "core/components/dialog/tabs/version";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import NamedTitle from "core/components/namedTitle";
import { GenericDocument } from "core/types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import MetaDataTab from "../analogDetailsDialog/MetadataFormTab";
import { createDocumentDialog } from "../baseDocumentDialog/documentDialogFactory";

export const analogReadonlyDetailsDialog: DialogContentType = createDocumentDialog(
  {
    tabs: [
      {
        content: MetaDataTab,
        label: t(translationPath(lang.dialog.tabs.metadata))
      },
      {
        content: ComponentsTab,
        label: t(translationPath(lang.dialog.tabs.components))
      },
      {
        content: VersionTab,
        label: t(translationPath(lang.dialog.tabs.version))
      },
      {
        content: ShipmentTab,
        filter: ({ dialogData }) =>
          (dialogData as DocumentReadonly)?.hideShipmentsTab !== true,
        label: t(translationPath(lang.dialog.tabs.shipment))
      },
      {
        content: SettleTab,
        filter: ({ dialogData }) => {
          const { state } =
            (dialogData as GenericDocument)?.properties?.ssl || {};

          return SettleTab.filter(state);
        },
        label: t(translationPath(lang.dialog.tabs.settle))
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
        text={t(translationPath(lang.dialog.title.documentDetail))}
        {...props}
      />
    ),
    type: DialogType.AnalogReadonlyDetails
  }
);
