import { SslDatabox } from "core/api/models";
import { sslDataboxPropsProxy } from "core/types";
import moment from "moment";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { validateErrors } from "share/utils/validation";
import { lang, t } from "translation/i18n";
import { attachmentsCount } from "validation";
import * as yup from "yup";

export const validate = (values: SslDatabox) =>
  validateErrors(validationSchema, values);

export const validationSchema = yup.object().shape({
  [lastPathMember(sslDataboxPropsProxy.pid).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(sslDataboxPropsProxy.form).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(sslDataboxPropsProxy.deliveryDate)
    .path]: yup
    .string()
    .required(t(translationPath(lang._validations.required))),
  deliveryTime: yup
    .string()
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(sslDataboxPropsProxy.deliveryMode)
    .path]: yup
    .string()
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(sslDataboxPropsProxy.attachmentsCount)
    .path]: attachmentsCount(),
  [lastPathMember(sslDataboxPropsProxy.attachmentsType).path]: yup
    .string()
    .max(50, t(translationPath(lang.dialog.errors.maxLen), { len: 50 })),
  [lastPathMember(sslDataboxPropsProxy.subject).path]: yup
    .string()
    .max(255, t(translationPath(lang.dialog.errors.maxLen), { len: 255 }))
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(sslDataboxPropsProxy.deliveryMode)
    .path]: yup
    .string()
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(sslDataboxPropsProxy.settleToDate).path]: yup
    .string()
    .nullable()
    .test(
      lastPathMember(sslDataboxPropsProxy.settleToDate).path,
      t(translationPath(lang.dialog.errors.dateFutureOnly)),
      (val) => !val || moment(val).isSameOrAfter(moment(), "day")
    )
});
