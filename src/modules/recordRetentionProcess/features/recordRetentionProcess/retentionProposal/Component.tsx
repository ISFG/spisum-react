import { Description } from "@material-ui/icons";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { SitePaths, SpisumNodeTypes } from "enums";
import React from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { classPath, translationPath } from "share/utils/getPath";
import { getRelativePath } from "share/utils/query";
import { convertDateToYear } from "share/utils/utils";
import { lang, t, withTranslation } from "translation/i18n";

const defaultColumn: DataColumn<GenericDocument> = {
  getValue: (x) => convertDateToYear(x?.properties?.ssl?.shreddingYear),
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
    label: t(translationPath(lang.general.sip))
  },
  {
    keys: [classPath(genericDocumentProxy.properties!.ssl!.decisionDA).path],
    label: t(translationPath(lang.general.decisionDA))
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
  const relativePath = useSelector((state: RootStateType) =>
    getRelativePath(
      state.loginReducer.global.paths,
      null,
      SitePaths.Repository,
      SitePaths.ShreddingProposal
    )
  );

  return (
    <MenuLayout>
      <DocumentView
        children={{
          relativePath
        }}
        columns={columns}
        controls={controls}
        customTitle={t(translationPath(lang.table.archivedDocumentsFiles))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
