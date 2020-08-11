import moment from "moment";
import { lang, t } from "translation/i18n";
import * as yup from "yup";
import { lastPathMember, translationPath } from "../../../utils/getPath";
import { validateErrors } from "../../../utils/validation";
import {
  PromoteConceptToDocumentFormValues,
  PromoteConceptToDocumentFormValuesProxy
} from "./_types";

export const validate = (values: PromoteConceptToDocumentFormValues) =>
  validateErrors(validationSchema, values);

export const validationSchema = yup.object().shape({
  [lastPathMember(PromoteConceptToDocumentFormValuesProxy.subject).path]: yup
    .string()
    .max(255, t(translationPath(lang.dialog.errors.maxLen), { len: 255 }))
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(PromoteConceptToDocumentFormValuesProxy.settleTo).path]: yup
    .string()
    .nullable()
    .test(
      lastPathMember(PromoteConceptToDocumentFormValuesProxy.settleTo).path,
      t(translationPath(lang.dialog.errors.dateFutureOnly)),
      (val) => !val || moment(val).isSameOrAfter(moment(), "day")
    ),
  [lastPathMember(PromoteConceptToDocumentFormValuesProxy.author)
    .path]: yup
    .string()
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(PromoteConceptToDocumentFormValuesProxy.attachmentsCount)
    .path]: yup
    .string()
    .test(
      lastPathMember(PromoteConceptToDocumentFormValuesProxy.attachmentsCount)
        .path,
      t(translationPath(lang.dialog.errors.min), { val: 0 }),
      (val) => +val >= 0
    )
    .required(t(translationPath(lang._validations.required)))
});
