import { createProxy } from "share/utils/getPath";

export type HandOverBackFormValues = {
  reason: string;
};

export const handOverBackFormValuesValuesProxy = createProxy<
  HandOverBackFormValues
>();
