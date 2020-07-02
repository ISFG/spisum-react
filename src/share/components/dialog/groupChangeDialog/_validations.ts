import { lastPathMember, translationPath } from "share/utils/getPath";
import { validateErrors } from "share/utils/validation";
import { lang, t } from "translation/i18n";
import * as yup from "yup";
import {
  groupChangeFormValuesProxy,
  GroupChangeFormValuesType
} from "./_types";

export const validate = (values: GroupChangeFormValuesType) =>
  validateErrors(validationSchema, values);

export const validationSchema = yup.object().shape({
  [lastPathMember(groupChangeFormValuesProxy.activeGroup).path]: yup
    .string()
    .trim()
    .required(t(translationPath(lang._validations.required)))
});
