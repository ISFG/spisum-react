import { createProxy } from "share/utils/getPath";

export type ChangePasswordFormValues = {
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
};

export const ChangePasswordFormValuesProxy = createProxy<
  ChangePasswordFormValues
>();
