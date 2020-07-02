import { partition } from "lodash";
import { File, FileMetaType } from "../../../../entities";

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
