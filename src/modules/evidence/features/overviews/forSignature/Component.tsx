import { Description } from "@material-ui/icons";
import { openDocumentWithSaveButtonsAction } from "core/api/document/_actions";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { SessionType } from "core/features/login/_types";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { DocumentType, SitePaths, SpisumNames, SpisumNodeTypes } from "enums";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { classPath, translationPath } from "share/utils/getPath";
import { alfrescoQuery, getQueryPath } from "share/utils/query";
import { isUserInLeadership } from "share/utils/user";
import { lang, t, withTranslation } from "translation/i18n";

const defaultColumn: DataColumn<GenericDocument> = {
  isDate: true,
  keys: [
    classPath(genericDocumentProxy.properties!.ssl!.forSignatureDate).path
  ],
  label: t(translationPath(lang.general.forSignatureDate))
};

const getColumns = (session: SessionType): DataColumn<GenericDocument>[] => {
  const columns: DataColumn<GenericDocument>[] = [
    {
      keys: [classPath(genericDocumentProxy.properties!.ssl!.pid).path],
      label: t(translationPath(lang.general.identifier))
    },
    {
      keys: [classPath(genericDocumentProxy.properties!.ssl!.ssid).path],
      label: t(translationPath(lang.general.referenceNumber))
    },
    {
      keys: [classPath(genericDocumentProxy.properties!.ssl!.subject).path],
      label: t(translationPath(lang.general.subject))
    },
    {
      isDate: true,
      keys: [classPath(genericDocumentProxy.createdAt).path],
      label: t(translationPath(lang.general.dateOfEvidence))
    },
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
    },
    defaultColumn
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
  const session = useSelector(
    (state: RootStateType) => state.loginReducer.session
  );
  const activeGroup = session.activeGroup;
  const dispatch = useDispatch();
  const documentsPath = useSelector(
    (state: RootStateType) =>
      getQueryPath(
        state.loginReducer.global.paths,
        "*",
        SitePaths.Evidence,
        SitePaths.Documents,
        SitePaths.ForProcessing,
        SitePaths.ForSignature
      )?.path || ""
  );
  const documentsInFilePath = useSelector(
    (state: RootStateType) =>
      getQueryPath(
        state.loginReducer.global.paths,
        "*",
        SitePaths.Evidence,
        SitePaths.Files,
        SitePaths.Documents,
        SitePaths.ForProcessing,
        SitePaths.ForSignature
      )?.path || ""
  );

  const dispatchOpenDialog: (row: GenericDocument) => void = (row) => {
    dispatch(
      openDocumentWithSaveButtonsAction({
        ...row,
        canUploadComponents: false,
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
        }
      ]
    }
  };

  return (
    <MenuLayout>
      <DocumentView
        columns={getColumns(session)}
        controls={controls}
        customTitle={t(translationPath(lang.table.forSignature))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        handleDoubleClick={dispatchOpenDialog}
        search={{
          query: {
            query: alfrescoQuery({
              paths: [documentsPath, documentsInFilePath],
              type: [SpisumNodeTypes.Document],
              where: `${SpisumNames.ForSignatureGroup}:'${activeGroup}'`
            })
          }
        }}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
