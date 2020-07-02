import { lastPathMember, translationPath } from "share/utils/getPath";
import { validateErrors } from "share/utils/validation";
import { lang, t } from "translation/i18n";
import * as yup from "yup";
import { ReasonFormValues, reasonFormValuesProxy } from "./_types";

export const validate = (values: ReasonFormValues) =>
  validateErrors(validationSchema, values);

export const validationSchema = yup.object().shape({
  [lastPathMember(reasonFormValuesProxy.reason).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required)))
    .min(4, t(translationPath(lang.dialog.errors.minLen), { len: 4 }))
    .max(30, t(translationPath(lang.dialog.errors.maxLen), { len: 30 }))
});
