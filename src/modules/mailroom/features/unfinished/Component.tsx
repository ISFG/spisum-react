import { Check, Delete } from "@material-ui/icons";
import { openDocumentDetailsAction } from "core/api/document/_actions";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { DocumentType, SenderType, SitePaths, SpisumNodeTypes } from "enums";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { classPath, translationPath } from "share/utils/getPath";
import { getRelativePath } from "share/utils/query";
import { lang, t, withTranslation } from "translation/i18n";
import { documentRegisterAction } from "../income/_actions";

const defaultColumn: DataColumn<GenericDocument> = {
  isDate: true,
  keys: [classPath(genericDocumentProxy.properties!.ssl!.deliveryDate).path],
  label: t(translationPath(lang.general.deliveryDate))
};

export const columns: DataColumn<GenericDocument>[] = [
  {
    keys: [classPath(genericDocumentProxy.properties!.ssl!.pid).path],
    label: t(translationPath(lang.general.identifier))
  },
  {
    keys: [classPath(genericDocumentProxy.properties!.ssl!.subject).path],
    label: t(translationPath(lang.general.subject))
  },
  {
    getValue: (x) =>
      x?.properties?.ssl?.senderType === SenderType.Legal
        ? x?.properties?.ssl?.sender_orgName
        : x?.properties?.ssl?.sender_name,
    keys: [
      classPath(genericDocumentProxy.properties!.ssl!.sender_orgName).path,
      classPath(genericDocumentProxy.properties!.ssl!.sender_name).path
    ],
    label: t(translationPath(lang.general.sender))
  },
  defaultColumn,
  {
    getValue: (x) =>
      x.properties?.ssl?.form === DocumentType.Analog
        ? x.properties!.ssl!.attachmentsCount
        : x.properties!.ssl!.associationCount,
    keys: [
      classPath(genericDocumentProxy.properties!.ssl!.attachmentsCount).path,
      classPath(genericDocumentProxy.properties!.ssl!.associationCount).path
    ],
    label: t(translationPath(lang.general.attachmentsCount))
  }
];

const Component = () => {
  const relativePath = useSelector((state: RootStateType) =>
    getRelativePath(
      state.loginReducer.global.paths,
      null,
      SitePaths.Mailroom,
      SitePaths.Unfinished
    )
  );
  const dispatch = useDispatch();

  const dispatchOpenDialog: (row: GenericDocument) => void = (row) => {
    if (row.properties?.ssl?.documentType === DocumentType.Email) {
      dispatch(
        documentRegisterAction({
          dialogType: DialogType.RegisterEmail,
          document: row,
          documentType: DocumentType.Digital,
          nodeType: SpisumNodeTypes.Email
        })
      );
    } else if (row.properties?.ssl?.documentType === DocumentType.Daatabox) {
      dispatch(
        documentRegisterAction({
          dialogType: DialogType.RegisterDatabox,
          document: row,
          documentType: DocumentType.Digital,
          nodeType: SpisumNodeTypes.Databox
        })
      );
    } else {
      dispatch(openDocumentDetailsAction(row));
    }
  };

  const controls: ControlsBarType<GenericDocument> = {
    single: {
      items: [
        {
          action: (selected: GenericDocument[]) => {
            dispatchOpenDialog(selected[0]);
          },
          icon: <Check />,
          title: t(translationPath(lang.general.register))
        }
      ],
      more: [
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogData: selected[0],
                dialogType: DialogType.Cancel
              })
            );
          },
          icon: <Delete />,
          title: t(translationPath(lang.general.cancel))
        }
      ]
    }
  };

  return (
    <MenuLayout>
      <DocumentView
        children={{
          relativePath,
          where: `(nodeType='${SpisumNodeTypes.Document}')`
        }}
        columns={columns}
        controls={controls}
        customTitle={t(translationPath(lang.menu.items.unfinished))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        handleDoubleClick={dispatchOpenDialog}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
