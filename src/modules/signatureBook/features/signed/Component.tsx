import { DataColumn } from "core/components/dataTable/_types";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { DocumentType, SitePaths, SpisumNodeTypes } from "enums";
import React from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { classPath, translationPath } from "share/utils/getPath";
import { alfrescoQuery, getQueryPath } from "share/utils/query";
import { lang, t, withTranslation } from "translation/i18n";

const defaultColumn: DataColumn<GenericDocument> = {
  isDate: true,
  keys: [classPath(genericDocumentProxy.properties!.ssl!.signedDate).path],
  label: t(translationPath(lang.general.signedDate))
};

export const columns: DataColumn<GenericDocument>[] = [
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
  {
    keys: [
      classPath(genericDocumentProxy.properties!.cm!.owner!.displayName).path
    ],
    label: t(translationPath(lang.general.owner))
  },
  defaultColumn,
  {
    keys: [classPath(genericDocumentProxy.properties!.ssl!.signedAuthor).path],
    label: t(translationPath(lang.general.signedAuthor))
  }
];

const Component = () => {
  const path = useSelector(
    (state: RootStateType) =>
      getQueryPath(
        state.loginReducer.global.paths,
        null,
        SitePaths.SignatureBook
      )?.path || ""
  );
  return (
    <MenuLayout>
      <DocumentView
        columns={columns}
        customTitle={t(translationPath(lang.table.signedDocuments))}
        defaultSortAsc={false}
        defaultSortColumn={defaultColumn}
        search={{
          query: {
            query: alfrescoQuery({
              paths: [path],
              type: [SpisumNodeTypes.Document]
            })
          }
        }}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
