import { lang, t } from "translation/i18n";
import { SenderType, SpisumNodeTypes } from "../../../enums";
import { classPath, translationPath } from "../../../share/utils/getPath";
import { isUserInLeadership } from "../../../share/utils/user";
import { SessionType } from "../../features/login/_types";
import { GenericDocument, genericDocumentProxy } from "../../types";
import { DataColumn } from "../dataTable/_types";

export const defaultColumn: DataColumn<GenericDocument> = {
  getValue: (x) =>
    x.nodeType === SpisumNodeTypes.File
      ? x?.properties?.ssl?.createdDate
      : x?.properties?.ssl?.senderType === SenderType.Own
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

export const getColumns = (
  session: SessionType
): DataColumn<GenericDocument>[] => {
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
