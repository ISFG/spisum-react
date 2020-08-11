import {
  primaryAction,
  secondaryAction
} from "core/components/dialog/lib/actionsFactory";
import { ReadOnlyComponentsTab } from "core/components/dialog/tabs/components";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import NamedTitle from "core/components/namedTitle";
import { EmailDocument } from "core/types";
import { SpisumNodeTypes } from "enums";
import { documentRegisterAction } from "modules/mailroom/features/income/_actions";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { createDocumentDialog } from "../baseDocumentDialog/documentDialogFactory";
import { MetadataFormTab } from "./MetadataFormTab";

export const emailDetailsDialog = createDocumentDialog({
  actions: () => [
    secondaryAction(
      t(translationPath(lang.dialog.form.register)),
      ({ dispatch, dialogProps, onClose }) => {
        onClose();
        dispatch(
          documentRegisterAction({
            dialogType: DialogType.RegisterEmail,
            document: dialogProps.data as EmailDocument,
            nodeType: SpisumNodeTypes.Email,
            onSuccess: onClose
          })
        );
      }
    ),

    primaryAction(
      t(translationPath(lang.dialog.form.notRegister)),
      ({ dispatch, dialogProps, onClose }) => {
        dispatch(
          dialogOpenAction({
            dialogProps: {
              ...dialogProps,
              onSuccess: onClose
            },
            dialogType: DialogType.DontRegisterDocument
          })
        );
      }
    ),
    primaryAction(
      t(translationPath(lang.dialog.form.notReadable)),
      ({ dispatch, dialogProps, onClose }) => {
        dispatch(
          dialogOpenAction({
            dialogProps: {
              ...dialogProps,
              onSuccess: onClose
            },
            dialogType: DialogType.IncompleteDocument
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
      text={t(translationPath(lang.dialog.title.emailDetails))}
      {...props}
    />
  ),
  type: DialogType.EmailDetails
});
