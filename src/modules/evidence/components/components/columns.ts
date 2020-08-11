import { DataColumn, DataColumnType } from "core/components/dataTable/_types";
import { File, FileMetaType, fileProxy } from "core/entities";
import { classPath, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";

const readableValues = [
  {
    text: "---",
    value: ""
  },
  { value: "true", text: t(translationPath(lang.general.yes)) },
  { value: "false", text: t(translationPath(lang.general.no)) }
];

const dmFileMetaTypeValues = [
  {
    text: "---",
    value: ""
  },
  {
    text: t(translationPath(lang.enums.fileMetaTypes.deliveryNote)),
    value: FileMetaType.deliveryNote
  },
  {
    text: t(translationPath(lang.enums.fileMetaTypes.signature)),
    value: FileMetaType.signature
  },
  {
    text: t(translationPath(lang.enums.fileMetaTypes.main)),
    value: FileMetaType.main
  },
  {
    text: t(translationPath(lang.enums.fileMetaTypes.meta)),
    value: FileMetaType.meta
  },
  {
    text: t(translationPath(lang.enums.fileMetaTypes.enclosure)),
    value: FileMetaType.enclosure
  },
  {
    text: t(
      translationPath(lang.enums.fileMetaTypes.signatureVerificationProtocol)
    ),
    value: FileMetaType.signatureVerificationProtocol
  }
];

const dmFileMetaTypeValuesWithoutMain = dmFileMetaTypeValues.filter(
  (x) => x.value !== FileMetaType.main
);

const getMetaTypeItems = (mainFile: File | undefined) => (row: File) => {
  // there is no main file, or we are generating dropdown items for the main file
  if (!mainFile || row.id === mainFile.id) {
    return dmFileMetaTypeValues;
  }

  return dmFileMetaTypeValuesWithoutMain;
};

const readOnlyColumns = [
  {
    keys: [classPath(fileProxy.name).path],
    label: t(translationPath(lang.general.name)),
    sortKeys: ["ssl:fileName"]
  },
  {
    keys: [classPath(fileProxy.size).path],
    label: t(translationPath(lang.general.size)),
    sortKeys: ["sizeInBytes"],
    type: DataColumnType.fileSize
  }
];

export const generateColumns = (
  mainFile: File | undefined,
  isReadonly?: boolean
): DataColumn<File>[] => {
  if (isReadonly) {
    return readOnlyColumns;
  }

  return [
    {
      keys: [classPath(fileProxy.name).path],
      label: t(translationPath(lang.general.name)),
      sortKeys: ["ssl:fileName"]
    },
    {
      getDropdownItems: getMetaTypeItems(mainFile),
      keys: [classPath(fileProxy.metaType).path],
      label: t(translationPath(lang.general.type)),
      type: DataColumnType.dropdown
    },
    {
      keys: [classPath(fileProxy.size).path],
      label: t(translationPath(lang.general.size)),
      sortKeys: ["sizeInBytes"],
      type: DataColumnType.fileSize
    },
    {
      dropdownItems: readableValues,
      keys: [classPath(fileProxy.isReadable).path],
      label: t(translationPath(lang.general.readable)),
      type: DataColumnType.dropdown
    }
  ];
};
