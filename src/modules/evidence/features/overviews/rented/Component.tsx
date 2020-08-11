import { AssignmentReturn, Description } from "@material-ui/icons";
import { openDocumentWithSaveButtonsAction } from "core/api/document/_actions";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { SessionType } from "core/features/login/_types";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { SitePaths, SpisumNames, SpisumNodeTypes } from "enums";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { classPath, translationPath } from "share/utils/getPath";
import { alfrescoQuery, getQueryPath } from "share/utils/query";
import { isUserInLeadership } from "share/utils/user";
import { lang, t, withTranslation } from "translation/i18n";

const defaultColumn: DataColumn<GenericDocument> = {
  getValue: (x) =>
    x.nodeType === SpisumNodeTypes.File
      ? x?.properties?.ssl?.createdDate
      : x?.properties?.ssl?.senderType === "own"
      ? x?.createdAt
      : x?.properties?.ssl?.deliveryDate,
  isDateTime: true,
  keys: [
    classPath(genericDocumentProxy.properties!.ssl!.deliveryDate).path,
    classPath(genericDocumentProxy.createdAt).path,
    classPath(genericDocumentProxy.properties!.ssl!.createdDate).path
  ],
  label: t(translationPath(lang.general.dateOfEvidence))
};

const getColumns = (session: SessionType): DataColumn<GenericDocument>[] => {
  const columns: DataColumn<GenericDocument>[] = [
    {
      keys: [classPath(genericDocumentProxy.properties!.ssl!.pid).path],
      label: t(translationPath(lang.general.identifier))
    },
    {
      getValue: (item) =>
        item.nodeType === SpisumNodeTypes.File
          ? item.properties?.ssl?.fileIdentificator
          : item.properties?.ssl?.ssid,
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
    defaultColumn,
    {
      keys: [classPath(genericDocumentProxy.properties!.ssl!.filePlan).path],
      label: t(translationPath(lang.general.filePlan))
    },
    {
      keys: [classPath(genericDocumentProxy.properties!.ssl!.fileMark).path],
      label: t(translationPath(lang.general.fileMark))
    },
    {
      keys: [
        classPath(genericDocumentProxy.properties!.ssl!.retentionMode).path
      ],
      label: t(translationPath(lang.general.retentionMode))
    },
    {
      keys: [classPath(genericDocumentProxy.properties!.ssl!.group).path],
      label: t(translationPath(lang.general.repositoryName))
    }
  ];

  if (isUserInLeadership(session)) {
    columns.push({
      keys: [classPath(genericDocumentProxy.properties!.ssl!.borrower).path],
      label: t(translationPath(lang.general.borrower))
    });
  }

  return columns;
};

const Component = () => {
  const dispatch = useDispatch();
  const session = useSelector(
    (state: RootStateType) => state.loginReducer.session
  );
  const activeGroup = session.activeGroup;
  const path = useSelector(
    (state: RootStateType) =>
      getQueryPath(
        state.loginReducer.global.paths,
        null,
        SitePaths.Repository,
        SitePaths.Rented
      )?.path || ""
  );

  const dispatchOpenDialog: (row: GenericDocument) => void = (row) => {
    dispatch(
      openDocumentWithSaveButtonsAction({
        canUploadComponents: false,
        data: row,
        hideManageShipmentsIcon: true,
        isReadonly: true
      })
    );
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
                dialogProps: { data: selected[0] },
                dialogType: DialogType.ReturnToRepository
              })
            );
          },
          filter: (x) => x.properties?.ssl?.form === "digital",
          icon: <AssignmentReturn />,
          title: t(translationPath(lang.general.return))
        }
      ]
    }
  };

  return (
    <MenuLayout>
      <DocumentView
        columns={getColumns(session)}
        controls={controls}
        customTitle={t(translationPath(lang.menu.items.borrowed))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        handleDoubleClick={dispatchOpenDialog}
        search={{
          query: {
            query: alfrescoQuery({
              paths: [path],
              type: [SpisumNodeTypes.Document, SpisumNodeTypes.File],
              where: `${SpisumNames.BorrowGroup}:'${activeGroup}' AND ${SpisumNames.IsInFile}:false`
            })
          }
        }}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
