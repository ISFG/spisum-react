import { createProxy } from "share/utils/getPath";

export type ForSignatureFormValues = {
  group: string;
  user: string;
};

export const forSignatureFormValuesProxy = createProxy<
  ForSignatureFormValues
>();
