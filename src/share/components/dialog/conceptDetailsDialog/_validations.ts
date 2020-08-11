import { SslProperties } from "core/api/models";
import { conceptProxy } from "core/types";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { validateErrors } from "share/utils/validation";
import { lang, t } from "translation/i18n";
import * as yup from "yup";

const MAX_STRING_LENGTH = 255;

export const validate = (values: SslProperties) =>
  validateErrors(validationSchema, values);

export const validationSchema = yup.object().shape({
  [lastPathMember(conceptProxy.properties?.ssl?.subject)
    .path]: yup
    .string()
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    )
});
