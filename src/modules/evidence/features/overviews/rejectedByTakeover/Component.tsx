import { Description, Send } from "@material-ui/icons";
import { openDocumentWithSaveButtonsAction } from "core/api/document/_actions";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { openFileDetailsAction } from "core/components/dialog/tabs/tableOfContents/_actions";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { SessionType } from "core/features/login/_types";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { SenderType, SitePaths, SpisumNames, SpisumNodeTypes } from "enums";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { dialogOpenConceptDetails } from "share/components/dialog/conceptDetailsDialog/_actions";
import { classPath, translationPath } from "share/utils/getPath";
import { alfrescoQuery, getQueryPath } from "share/utils/query";
import { isUserInLeadership } from "share/utils/user";
import { lang, t, withTranslation } from "translation/i18n";
import { handoverDocument } from "../../../../../share/components/dialog/documentHandoverDialog/_actions";

const defaultColumn: DataColumn<GenericDocument> = {
  getValue: (x) =>
    x.nodeType === SpisumNodeTypes.File
      ? x?.properties?.ssl?.createdDate
      : x?.properties?.ssl?.senderType === "own"
      ? x?.createdAt
      : x?.properties?.ssl?.deliveryDate,
  isDate: true,
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
    defaultColumn,
    {
      keys: [
        classPath(
          genericDocumentProxy.properties!.ssl!.originalDestinationHandover
        ).path
      ],
      label: t(translationPath(lang.general.originalDestinationHandover))
    }
  ];

  if (isUserInLeadership(session)) {
    columns.push({
      keys: [
        classPath(genericDocumentProxy.properties!.cm!.owner?.displayName).path
      ],
      label: t(translationPath(lang.general.owner))
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
  const pathDocuments = useSelector(
    (state: RootStateType) =>
      getQueryPath(
        state.loginReducer.global.paths,
        "*",
        SitePaths.Evidence,
        SitePaths.Documents
      )?.path || ""
  );
  const pathDocumentsForProcessing = useSelector(
    (state: RootStateType) =>
      getQueryPath(
        state.loginReducer.global.paths,
        "*",
        SitePaths.Evidence,
        SitePaths.Documents,
        SitePaths.ForProcessing
      )?.path || ""
  );
  const pathDocumentsProcessed = useSelector(
    (state: RootStateType) =>
      getQueryPath(
        state.loginReducer.global.paths,
        "*",
        SitePaths.Evidence,
        SitePaths.Documents,
        SitePaths.Processed
      )?.path || ""
  );
  const pathFilesOpen = useSelector(
    (state: RootStateType) =>
      getQueryPath(
        state.loginReducer.global.paths,
        "*",
        SitePaths.Evidence,
        SitePaths.Files,
        SitePaths.Open
      )?.path || ""
  );
  const pathFilesClosed = useSelector(
    (state: RootStateType) =>
      getQueryPath(
        state.loginReducer.global.paths,
        "*",
        SitePaths.Evidence,
        SitePaths.Files,
        SitePaths.Closed
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
    } else if (row.nodeType === SpisumNodeTypes.Concept) {
      dispatch(dialogOpenConceptDetails({ ...row, isReadonly: true }));
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
            dispatch(handoverDocument(selected[0]));
          },
          icon: <Send />,
          title: t(translationPath(lang.general.handOVer))
        }
      ]
    }
  };

  return (
    <MenuLayout>
      <DocumentView
        columns={getColumns(session)}
        controls={controls}
        customTitle={t(translationPath(lang.table.rejectedTakeover))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        handleDoubleClick={dispatchOpenDialog}
        search={{
          query: {
            query: alfrescoQuery({
              paths: [
                pathDocuments,
                pathDocumentsForProcessing,
                pathDocumentsProcessed,
                pathFilesOpen,
                pathFilesClosed
              ],
              type: [SpisumNodeTypes.Document, SpisumNodeTypes.File],
              where: `${SpisumNames.Group}:'${activeGroup}'  AND ${SpisumNames.NextOwnerDecline}:true AND ${SpisumNames.IsInFile}:false`
            })
          }
        }}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
