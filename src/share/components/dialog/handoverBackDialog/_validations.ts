import { translationPath } from "share/utils/getPath";
import { validateErrors } from "share/utils/validation";
import { lang, t } from "translation/i18n";
import * as yup from "yup";
import { HandOverBackFormValues } from "./_types";

export const validate = (values: HandOverBackFormValues) =>
  validateErrors(validationSchema, values);

export const validationSchema = yup.object().shape({
  reason: yup
    .string()
    .trim()
    .min(4, t(translationPath(lang.dialog.errors.minLen), { len: 4 }))
    .max(30, t(translationPath(lang.dialog.errors.maxLen), { len: 30 }))
    .required(t(translationPath(lang._validations.required)))
});
