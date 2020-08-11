import { Concept } from "core/entities/concept/Concept";
import { sslPropsProxy } from "core/types";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { validateErrors } from "share/utils/validation";
import { lang, t } from "translation/i18n";
import * as yup from "yup";

export const validate = (values: Concept) =>
  validateErrors(validationSchema, values);

export const validationSchema = yup.object().shape({
  [lastPathMember(sslPropsProxy.subject).path]: yup
    .string()
    .max(255, t(translationPath(lang.dialog.errors.maxLen), { len: 255 }))
});
