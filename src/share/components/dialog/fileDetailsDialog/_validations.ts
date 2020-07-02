import { SslProperties } from "core/api/models";
import { sslPropsProxy } from "core/types";
import moment from "moment";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { validateErrors } from "share/utils/validation";
import { lang, t } from "translation/i18n";
import * as yup from "yup";

export const validate = (values: SslProperties) =>
  validateErrors(validationSchema, values);

export const validationSchema = yup.object().shape({
  [lastPathMember(sslPropsProxy.settleToDate).path]: yup
    .string()
    .nullable()
    .test(
      lastPathMember(sslPropsProxy.settleToDate).path,
      t(translationPath(lang.dialog.errors.dateFutureOnly)),
      (val) => !val || moment(val).isSameOrAfter(moment(), "day")
    ),
  [lastPathMember(sslPropsProxy.subject).path]: yup
    .string()
    .max(255, t(translationPath(lang.dialog.errors.maxLen), { len: 255 })),
  [lastPathMember(sslPropsProxy.senderSSID).path]: yup
    .string()
    .max(100, t(translationPath(lang.dialog.errors.maxLen), { len: 100 })),
  [lastPathMember(sslPropsProxy.senderIdent).path]: yup
    .string()
    .max(100, t(translationPath(lang.dialog.errors.maxLen), { len: 100 }))
});
