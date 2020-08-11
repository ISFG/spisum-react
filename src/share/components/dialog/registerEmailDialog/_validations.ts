import { SslEmail } from "core/api/models";
import { sslEmailPropsProxy } from "core/types";
import moment from "moment";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { validateErrors } from "share/utils/validation";
import { lang, t } from "translation/i18n";
import { attachmentsCount } from "validation";
import * as yup from "yup";

export const validate = (values: SslEmail) =>
  validateErrors(validationSchema, values);

export const validationSchema = yup.object().shape({
  [lastPathMember(sslEmailPropsProxy.pid).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(sslEmailPropsProxy.form).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(sslEmailPropsProxy.deliveryDate).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required))),
  deliveryTime: yup
    .string()
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(sslEmailPropsProxy.deliveryMode).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(sslEmailPropsProxy.attachmentsCount)
    .path]: attachmentsCount(),
  [lastPathMember(sslEmailPropsProxy.attachmentsType).path]: yup
    .string()
    .max(50, t(translationPath(lang.dialog.errors.maxLen), { len: 50 })),
  [lastPathMember(sslEmailPropsProxy.subject).path]: yup
    .string()
    .max(255, t(translationPath(lang.dialog.errors.maxLen), { len: 255 }))
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(sslEmailPropsProxy.deliveryMode).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(sslEmailPropsProxy.settleToDate).path]: yup
    .string()
    .nullable()
    .test(
      lastPathMember(sslEmailPropsProxy.settleToDate).path,
      t(translationPath(lang.dialog.errors.dateFutureOnly)),
      (val) => !val || moment(val).isSameOrAfter(moment(), "day")
    )
});
