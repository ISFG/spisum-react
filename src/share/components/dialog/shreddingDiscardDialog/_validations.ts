import moment from "moment";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { validateErrors } from "share/utils/validation";
import { lang, t } from "translation/i18n";
import * as yup from "yup";
import {
  ShreddingDiscardFormValues,
  shreddingDiscardFormValuesProxy
} from "./_types";

export const validate = (values: ShreddingDiscardFormValues) =>
  validateErrors(validationSchema, values);

export const validationSchema = yup.object().shape({
  [lastPathMember(shreddingDiscardFormValuesProxy.reason).path]: yup
    .string()
    .min(4, t(translationPath(lang.dialog.errors.minLen), { len: 4 }))
    .max(30, t(translationPath(lang.dialog.errors.maxLen), { len: 30 }))
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(shreddingDiscardFormValuesProxy.date).path]: yup
    .string()
    .nullable()
    .required(t(translationPath(lang._validations.required)))
    .test(
      lastPathMember(shreddingDiscardFormValuesProxy.date).path,
      t(translationPath(lang.dialog.errors.dateFutureOnly)),
      (val) => !val || moment(val).isSameOrAfter(moment(), "minute")
    )
});
