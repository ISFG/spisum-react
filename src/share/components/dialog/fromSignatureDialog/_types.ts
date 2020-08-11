import { createProxy } from "share/utils/getPath";

export type FromSignatureFormValues = {
  visual: boolean;
};

export const fromSignatureFormValuesProxy = createProxy<
  FromSignatureFormValues
>();
