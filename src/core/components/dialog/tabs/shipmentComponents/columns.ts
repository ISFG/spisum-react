import { classPath, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { File, fileProxy } from "../../../../entities";
import { DataColumn, DataColumnType } from "../../../dataTable/_types";

const readOnlyColumns = [
  {
    keys: [classPath(fileProxy.name).path],
    label: t(translationPath(lang.general.name))
  },
  {
    keys: [classPath(fileProxy.size).path],
    label: t(translationPath(lang.general.size)),
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
      label: t(translationPath(lang.general.name))
    },
    {
      keys: [classPath(fileProxy.size).path],
      label: t(translationPath(lang.general.size)),
      type: DataColumnType.fileSize
    }
  ];
};
