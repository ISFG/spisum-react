import { createProxy } from "share/utils/getPath";

export type IncompleteDocumentFormValues = {
  recipient: string;
  subject: string;
  body: string;
  files?: File[];
};

export const IncompleteDocumentFormValuesProxy = createProxy<
  IncompleteDocumentFormValues
>();
