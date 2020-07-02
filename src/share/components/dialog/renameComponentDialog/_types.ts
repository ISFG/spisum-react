import { File } from "core/entities";
import { createProxy } from "share/utils/getPath";

export type RenameComponentFormValues = {
  name: File["name"];
};

export const renameComponentFormValuesProxy = createProxy<
  RenameComponentFormValues
>();
