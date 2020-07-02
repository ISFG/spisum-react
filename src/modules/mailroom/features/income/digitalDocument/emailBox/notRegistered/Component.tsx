import { Check, Description } from "@material-ui/icons";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { DialogType } from "core/components/dialog/_types";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { EmailDocument, emailDocumentProxy } from "core/types";
import { DocumentType, SitePaths, SpisumNodeTypes } from "enums";
import React, { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { dialogOpenEmailDetails } from "share/components/dialog/emailDetailsDialog/_actions";
import { classPath, translationPath } from "share/utils/getPath";
import { getRelativePath } from "share/utils/query";
import { isEmptyString } from "share/utils/utils";
import { lang, t, withTranslation } from "translation/i18n";
import { ActionType } from "typesafe-actions";
import { documentRegisterAction } from "../../../_actions";

enum NotRegisteredReason {
  EM_VAL_01 = "EM_VAL_01"
}

const NotRegisteredTranslationMap = {
  [NotRegisteredReason.EM_VAL_01]: lang.general.notValid
};

const defaultColumn: DataColumn<EmailDocument> = {
  isDate: true,
  keys: [classPath(emailDocumentProxy.properties!.ssl!.emailDeliveryDate).path],
  label: t(translationPath(lang.general.delivery))
};

const columns: DataColumn<EmailDocument>[] = [
  {
    keys: [classPath(emailDocumentProxy.properties!.ssl!.emailSubject).path],
    label: t(translationPath(lang.general.subject))
  },
  {
    getValue: (item) =>
      `${item.properties?.ssl?.emailSender}${
        !isEmptyString(item.properties?.ssl?.emailSenderName)
          ? ` (${item.properties?.ssl?.emailSenderName})`
          : ""
      }`,
    keys: [
      classPath(emailDocumentProxy.properties!.ssl!.emailSender).path,
      classPath(emailDocumentProxy.properties!.ssl!.emailSenderName).path
    ],
    label: t(translationPath(lang.general.sender))
  },
  defaultColumn,
  {
    keys: [
      classPath(emailDocumentProxy.properties!.ssl!.emailAttachmentsCount).path
    ],
    label: t(translationPath(lang.general.attachmentsCount))
  },
  {
    getValue: (item) => {
      if (!item.properties?.ssl?.emailNotRegisteredReason) {
        return "";
      }

      const translation =
        NotRegisteredTranslationMap[
          item.properties?.ssl?.emailNotRegisteredReason
        ];

      return translation
        ? `${t(translationPath(translation))}`
        : item.properties?.ssl?.emailNotRegisteredReason;
    },
    keys: [
      classPath(emailDocumentProxy.properties!.ssl!.emailNotRegisteredReason)
        .path
    ],
    label: t(translationPath(lang.general.notRegisterReason))
  }
];

const Component = () => {
  const dispatch = useDispatch<
    Dispatch<
      ActionType<typeof dialogOpenEmailDetails | typeof documentRegisterAction>
    >
  >();

  const paths = useSelector(
    (state: RootStateType) => state.loginReducer.global.paths
  );

  const relativePath = getRelativePath(
    paths,
    null,
    SitePaths.Mailroom,
    SitePaths.MailBox,
    SitePaths.NotRegistered
  );

  const dispatchOpenDialog: (row: EmailDocument) => void = (row) => {
    dispatch(dialogOpenEmailDetails(row));
  };

  const controls: ControlsBarType<EmailDocument> = {
    single: {
      items: [
        {
          action: (selected: EmailDocument[]) => {
            dispatchOpenDialog(selected[0]);
          },
          icon: <Description />,
          title: t(translationPath(lang.general.showDetails))
        },
        {
          action: (selected: EmailDocument[]) => {
            dispatch(
              documentRegisterAction({
                dialogType: DialogType.RegisterEmail,
                document: selected[0] as EmailDocument,
                documentType: DocumentType.Digital,
                nodeType: SpisumNodeTypes.Email
              })
            );
          },
          icon: <Check />,
          title: t(translationPath(lang.general.register))
        }
      ]
    }
  };

  return (
    <MenuLayout>
      <DocumentView
        children={{
          relativePath,
          where: `(nodeType='${SpisumNodeTypes.Email}')`
        }}
        columns={columns}
        controls={controls}
        customTitle={t(translationPath(lang.table.notRegisteredEmails))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        handleDoubleClick={dispatchOpenDialog}
      />
    </MenuLayout>
  );
};

Component.displayName = "notRegistered";

export default withTranslation()(Component);
