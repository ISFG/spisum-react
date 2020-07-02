import { lastPathMember, translationPath } from "share/utils/getPath";
import { validateErrors } from "share/utils/validation";
import { lang, t } from "translation/i18n";
import * as yup from "yup";
import {
  ChangeFileMarkFormValues,
  changeFileMarkFormValuesProxy
} from "./_types";

export const validate = (values: ChangeFileMarkFormValues) =>
  validateErrors(validationSchema, values);

export const validationSchema = yup.object().shape({
  [lastPathMember(changeFileMarkFormValuesProxy.fileMark)
    .path]: yup
    .string()
    .required(t(translationPath(lang._validations.required)))
});
