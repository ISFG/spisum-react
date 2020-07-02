import { partition } from "lodash";
import { SendModeValues } from "../../../../../enums";
import { File, FileMetaType } from "../../../../entities";
import { sumFileSizes } from "../../../../helpers/file";

export const isMainFile = (file: File) => file.metaType === FileMetaType.main;

const alphabeticalFilesSorter = (a: File, b: File) =>
  a.name?.localeCompare(b.name || "") || 0;

export const sortComponents = (files: File[]) => {
  const [[mainFile], otherFiles] = partition(files, isMainFile);

  otherFiles.sort(alphabeticalFilesSorter);

  if (mainFile) {
    otherFiles.unshift(mainFile);
  }

  return otherFiles;
};

export const findMainFile = (files: File[]) => files.find(isMainFile);

const getComponentMaxSizeAndCount = (sendMode: string) => {
  if (sendMode === SendModeValues.Databox) {
    return {
      maxCount: Infinity,
      maxSize: 50000
    };
  } else {
    return {
      maxCount: 300,
      maxSize: 10000
    };
  }
};
const convertToKB = (value: number | undefined) => {
  if (value) {
    return (value / 1024).toFixed(1);
  }
  return 0;
};

export const componentValidation = (
  components: File[] | undefined,
  sendMode: string
) => {
  const { maxSize, maxCount } = getComponentMaxSizeAndCount(sendMode);
  const selectedSize = components ? sumFileSizes(components) : 0;
  const isTooBig = convertToKB(selectedSize) > maxSize;
  const isWrongCountOfFiles =
    components && (components.length > maxCount || components.length === 0);

  return { isTooBig, isWrongCountOfFiles };
};
