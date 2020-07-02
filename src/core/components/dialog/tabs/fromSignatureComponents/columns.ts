import { classPath, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { File, fileProxy } from "../../../../entities";
import { DataColumn } from "../../../dataTable/_types";

const readOnlyColumns = [
  {
    keys: [classPath(fileProxy.name).path],
    label: t(translationPath(lang.general.name))
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
      label: t(translationPath(lang.general.name))
    },
    {
      isBoolean: true,
      keys: [classPath(fileProxy.fileIsSigned).path],
      label: t(translationPath(lang.enums.fileMetaTypes.signature))
    },
    {
      isBoolean: true,
      keys: [classPath(fileProxy.isSealed).path],
      label: t(translationPath(lang.general.electronicSeal))
    },
    {
      isDate: true,
      keys: [classPath(fileProxy.usedTime).path],
      label: t(translationPath(lang.general.dateAndTimeSafe))
    }
  ];
};
