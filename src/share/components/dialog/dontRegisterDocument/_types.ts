import { createProxy } from "share/utils/getPath";

export type DontRegisterDocumentFormValues = {
  reason: string;
};

export const dontRegisterDocumentFormValuesProxy = createProxy<
  DontRegisterDocumentFormValues
>();
