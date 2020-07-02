import { AssignmentReturn, Description } from "@material-ui/icons";
import { openDocumentWithSaveButtonsAction } from "core/api/document/_actions";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { openFileDetailsAction } from "core/components/dialog/tabs/tableOfContents/_actions";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { SenderType, SitePaths, SpisumNames, SpisumNodeTypes } from "enums";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { classPath, translationPath } from "share/utils/getPath";
import { alfrescoQuery, getQueryPath } from "share/utils/query";
import { lang, t, withTranslation } from "translation/i18n";
import { dialogOpenAction } from "../../../../core/components/dialog/_actions";
import { DialogType } from "../../../../core/components/dialog/_types";

const defaultColumn: DataColumn<GenericDocument> = {
  isDate: true,
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
  const documentsPath = useSelector(
    (state: RootStateType) =>
      getQueryPath(
        state.loginReducer.global.paths,
        null,
        SitePaths.Repository,
        SitePaths.Documents,
        SitePaths.Rented
      )?.path || ""
  );
  const filesPath = useSelector(
    (state: RootStateType) =>
      getQueryPath(
        state.loginReducer.global.paths,
        null,
        SitePaths.Repository,
        SitePaths.Files,
        SitePaths.Rented
      )?.path || ""
  );

  const dispatchOpenDialog: (row: GenericDocument) => void = (row) => {
    if (row.nodeType === SpisumNodeTypes.Document) {
      dispatch(
        openDocumentWithSaveButtonsAction({
          ...row,
          canUploadComponents: false,
          isReadonly: true
        })
      );
    } else if (row.nodeType === SpisumNodeTypes.File) {
      dispatch(openFileDetailsAction({ ...row, readonly: true }));
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
          action: (selected) => {
            dispatch(
              dialogOpenAction({
                dialogData: selected[0],
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
        columns={columns}
        controls={controls}
        customTitle={t(translationPath(lang.table.borrowedDocuments))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        handleDoubleClick={dispatchOpenDialog}
        search={{
          query: {
            query: alfrescoQuery({
              paths: [documentsPath, filesPath],
              type: [SpisumNodeTypes.Document, SpisumNodeTypes.File],
              where: `${SpisumNames.IsInFile}:false`
            })
          }
        }}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
