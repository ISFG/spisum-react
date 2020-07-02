import { Description } from "@material-ui/icons";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { SitePaths, SpisumNames, SpisumNodeTypes } from "enums";
import React from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { classPath, translationPath } from "share/utils/getPath";
import { alfrescoQuery, getQueryPath } from "share/utils/query";
import { lang, t, withTranslation } from "translation/i18n";

const defaultColumn: DataColumn<GenericDocument> = {
  keys: [classPath(genericDocumentProxy.properties!.ssl!.shreddingYear).path],
  label: t(translationPath(lang.general.yearOfShredding))
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
  defaultColumn,
  {
    keys: [classPath(genericDocumentProxy.properties!.ssl!.sip).path],
    label: t(translationPath(lang.general.sipForArchive))
  },
  {
    keys: [classPath(genericDocumentProxy.properties!.ssl!.decisionDA).path],
    label: t(translationPath(lang.general.decisionDA))
  },
  {
    keys: [classPath(genericDocumentProxy.properties!.ssl!.idDA).path],
    label: t(translationPath(lang.general.idDA))
  },
  {
    isDate: true,
    keys: [classPath(genericDocumentProxy.properties!.ssl!.eraseDate).path],
    label: t(translationPath(lang.general.erase))
  }
];

const controls: ControlsBarType<GenericDocument> = {
  single: {
    items: [
      {
        action: () => {},
        icon: <Description />,
        title: t(translationPath(lang.general.showDetails))
      }
    ]
  }
};

const Component = () => {
  const path = useSelector(
    (state: RootStateType) =>
      getQueryPath(
        state.loginReducer.global.paths,
        null,
        SitePaths.RM,
        SitePaths.ShreddingPlan
      )?.path || ""
  );

  return (
    <MenuLayout>
      <DocumentView
        columns={columns}
        controls={controls}
        customTitle={t(translationPath(lang.table.archivedDocumentsFiles))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        search={{
          query: {
            query: alfrescoQuery({
              paths: [path],
              type: [],
              where: `${SpisumNames.RetentionProposal}:[* TO *]`
            })
          }
        }}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
