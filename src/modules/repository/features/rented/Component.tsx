import { AssignmentReturn, Description } from "@material-ui/icons";
import { openDocumentWithSaveButtonsAction } from "core/api/document/_actions";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { openFileDetailsAction } from "core/components/dialog/tabs/tableOfContents/_actions";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { SenderType, SitePaths, SpisumNodeTypes } from "enums";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { classPath, translationPath } from "share/utils/getPath";
import { getRelativePath } from "share/utils/query";
import { lang, t, withTranslation } from "translation/i18n";

const defaultColumn: DataColumn<GenericDocument> = {
  isDateTime: true,
  keys: [classPath(genericDocumentProxy.properties!.ssl!.borrowDate).path],
  label: t(translationPath(lang.general.borrowDate))
};

export const columns: DataColumn<GenericDocument>[] = [
  {
    keys: [classPath(genericDocumentProxy.properties!.ssl!.pid).path],
    label: t(translationPath(lang.general.identifier))
  },
  {
    getValue: (item) =>
      item.nodeType === SpisumNodeTypes.Document
        ? item.properties?.ssl?.ssid
        : item.properties?.ssl?.fileIdentificator,
    keys: [
      classPath(genericDocumentProxy.properties!.ssl!.ssid).path,
      classPath(genericDocumentProxy.properties!.ssl!.fileIdentificator).path
    ],
    label: `${t(translationPath(lang.general.referenceNumber))}/${t(
      translationPath(lang.general.fileIdentificator)
    )}`
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
  {
    keys: [classPath(genericDocumentProxy.properties!.ssl!.filePlan).path],
    label: t(translationPath(lang.general.filePlan))
  },
  {
    keys: [classPath(genericDocumentProxy.properties!.ssl!.fileMark).path],
    label: t(translationPath(lang.general.fileMark))
  },
  {
    keys: [classPath(genericDocumentProxy.properties!.ssl!.retentionMode).path],
    label: t(translationPath(lang.general.retentionMode))
  },
  {
    keys: [classPath(genericDocumentProxy.properties!.ssl!.borrower).path],
    label: t(translationPath(lang.general.borrower))
  },
  defaultColumn
];

const Component = () => {
  const dispatch = useDispatch();
  const relativePath = useSelector((state: RootStateType) =>
    getRelativePath(
      state.loginReducer.global.paths,
      null,
      SitePaths.Repository,
      SitePaths.Rented
    )
  );

  const dispatchOpenDialog: (row: GenericDocument) => void = (row) => {
    if (row.nodeType === SpisumNodeTypes.Document) {
      dispatch(
        openDocumentWithSaveButtonsAction({
          canUploadComponents: false,
          data: row,
          hideManageShipmentsIcon: true,
          initiator: SpisumNodeTypes.File,
          isReadonly: true
        })
      );
    } else if (row.nodeType === SpisumNodeTypes.File) {
      dispatch(
        openFileDetailsAction({
          data: row,
          hideManageShipmentsIcon: true,
          initiator: SpisumNodeTypes.File,
          isReadonly: true
        })
      );
    }
  };

  const controls: ControlsBarType<GenericDocument> = {
    single: {
      items: [
        {
          action: (selected: GenericDocument[]) =>
            dispatchOpenDialog(selected[0]),
          icon: <Description />,
          title: t(translationPath(lang.general.showDetails))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogProps: { data: selected[0] },
                dialogType: DialogType.ReturnToRepository
              })
            );
          },
          icon: <AssignmentReturn />,
          title: t(translationPath(lang.general.return))
        }
      ]
    }
  };

  return (
    <MenuLayout>
      <DocumentView
        children={{
          relativePath
        }}
        columns={columns}
        controls={controls}
        customTitle={t(translationPath(lang.table.borrowedDocuments))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        handleDoubleClick={dispatchOpenDialog}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
