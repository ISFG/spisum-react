import { SslProperties } from "core/api/models";
import { sslPropsProxy } from "core/types";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { validateErrors } from "share/utils/validation";
import { lang, t } from "translation/i18n";
import * as yup from "yup";

const MAX_STRING_LENGTH = 100;

export const validate = (values: SslProperties) =>
  validateErrors(validationSchema, values);

export const validationSchema = yup.object().shape({
  [lastPathMember(sslPropsProxy.location).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required)))
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    )
});
