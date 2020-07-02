import { createProxy } from "../../../utils/getPath";

export type ChangeFileMarkFormValues = {
  fileMark?: string;
};

export const changeFileMarkFormValuesProxy = createProxy<
  ChangeFileMarkFormValues
>();
