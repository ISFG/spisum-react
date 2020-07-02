import { File } from "core/entities";
import path from "path";

export const getExtension = (file: File) => path.extname(file.name || "");

export const getNameWithoutExtension = (file: File) =>
  path.basename(file.name || "", getExtension(file));

export const updateFileName = (file: File, name: string) => {
  return {
    ...file,
    name: `${name}${getExtension(file)}`
  };
};
