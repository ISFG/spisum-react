import { lastPathMember, translationPath } from "share/utils/getPath";
import { validateErrors } from "share/utils/validation";
import { lang, t } from "translation/i18n";
import * as Yup from "yup";
import { ForSignatureFormValues, forSignatureFormValuesProxy } from "./_types";

export const validate = (values: ForSignatureFormValues) =>
  validateErrors(validationSchema, values);

export const validationSchema = Yup.object().shape({
  [lastPathMember(forSignatureFormValuesProxy.group).path]: Yup.string()
    .trim()
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(forSignatureFormValuesProxy.user).path]: Yup.string()
    .trim()
    .required(t(translationPath(lang._validations.required)))
});
