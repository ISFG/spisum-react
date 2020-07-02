import { lastPathMember, translationPath } from "share/utils/getPath";
import { validateErrors } from "share/utils/validation";
import { lang, t } from "translation/i18n";
import * as yup from "yup";
import {
  IncompleteDocumentFormValues,
  IncompleteDocumentFormValuesProxy
} from "./_types";

export const validate = (values: IncompleteDocumentFormValues) =>
  validateErrors(validationSchema, values);

export const validationSchema = yup.object().shape({
  [lastPathMember(IncompleteDocumentFormValuesProxy.body)
    .path]: yup
    .string()
    .required(t(translationPath(lang._validations.requiredBody))),
  [lastPathMember(IncompleteDocumentFormValuesProxy.subject).path]: yup
    .string()
    .required(t(translationPath(lang._validations.requiredSubject)))
    .max(255, t(translationPath(lang.dialog.errors.maxLen), { len: 255 }))
});
