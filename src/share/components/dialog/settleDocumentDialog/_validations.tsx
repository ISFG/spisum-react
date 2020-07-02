import { sslPropsProxy } from "core/types";
import { SettleMethod } from "enums";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { validateErrors } from "share/utils/validation";
import { lang, t } from "translation/i18n";
import * as yup from "yup";
import { SettleDocumentFormValues } from "./_types";

export const validate = (values: SettleDocumentFormValues) =>
  validateErrors(validationSchema, values);

export const validationSchema = yup.object().shape({
  [lastPathMember(sslPropsProxy.settleMethod).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(sslPropsProxy.settleReason).path]: yup
    .string()
    .when(lastPathMember(sslPropsProxy.settleMethod).path, {
      is: SettleMethod.Other,
      then: yup
        .string()
        .min(4, t(translationPath(lang.dialog.errors.minLen), { len: 4 }))
        .max(30, t(translationPath(lang.dialog.errors.maxLen), { len: 30 }))
    }),
  [lastPathMember(sslPropsProxy.customSettleMethod).path]: yup
    .string()
    .when(lastPathMember(sslPropsProxy.settleMethod).path, {
      is: SettleMethod.Other,
      then: yup
        .string()
        .required(t(translationPath(lang._validations.required)))
    })
});
