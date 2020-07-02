import { createProxy } from "share/utils/getPath";

export type RecoverDialogFormValues = {
  reason: string;
};

export const recoverDialogFormValuesProxy = createProxy<
  RecoverDialogFormValues
>();
