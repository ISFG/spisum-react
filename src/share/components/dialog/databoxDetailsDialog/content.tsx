import {
  primaryAction,
  secondaryAction
} from "core/components/dialog/lib/actionsFactory";
import { ReadOnlyComponentsTab } from "core/components/dialog/tabs/components";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { DataboxDocument } from "core/types";
import { SpisumNodeTypes } from "enums";
import { documentRegisterAction } from "modules/mailroom/features/income/_actions";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { MetadataFormTab } from "./MetadataFormTab";
import { createDocumentDialog } from "../baseDocumentDialog/documentDialogFactory";
import NamedTitle from "../../../../core/components/namedTitle";
import React from "react";

export const databoxDetailsDialog: DialogContentType = createDocumentDialog({
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.form.register)),
      ({ dispatch, dialogData, onClose }) => {
        onClose();
        dispatch(
          documentRegisterAction({
            dialogType: DialogType.RegisterDatabox,
            document: dialogData as DataboxDocument,
            nodeType: SpisumNodeTypes.Databox,
            onSuccess: onClose
          })
        );
      }
    ),

    primaryAction(
      t(translationPath(lang.dialog.form.notRegister)),
      ({ dispatch, dialogData, onClose }) => {
        dispatch(
          dialogOpenAction({
            dialogData: {
              ...dialogData,
              onSuccess: onClose
            },
            dialogType: DialogType.DontRegisterDocument
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
      content: ReadOnlyComponentsTab,
      label: t(translationPath(lang.dialog.tabs.components))
    }
  ],
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.databoxDetails))}
      {...props}
    />
  ),
  type: DialogType.DataboxDetails
});
