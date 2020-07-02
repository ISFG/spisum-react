import { classPath, translationPath } from "share/utils/getPath";
import { validateErrors } from "share/utils/validation";
import { t } from "translation/i18n";
import lang from "translation/lang";
import * as yup from "yup";
import { LoginFormValuesType, LoginFormValuesTypeProxy } from "./_types";

export const validate = (values: LoginFormValuesType) =>
  validateErrors(validationSchema, values);

export const validationSchema = yup.object().shape({
  [classPath(LoginFormValuesTypeProxy.password).path]: yup
    .string()
    .trim()
    .required(t(translationPath(lang._validations.inputPassword))),
  [classPath(LoginFormValuesTypeProxy.username).path]: yup
    .string()
    .trim()
    .required(t(translationPath(lang._validations.inputUsername)))
});
