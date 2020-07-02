import { lastPathMember, translationPath } from "share/utils/getPath";
import { validateErrors } from "share/utils/validation";
import { lang, t } from "translation/i18n";
import * as yup from "yup";
import {
  CreateOrganizationUnitFormValues,
  CreateOrganizationUnitFormValuesProxy
} from "./_types";

export const validate = (values: CreateOrganizationUnitFormValues) =>
  validateErrors(validationSchema, values);

export const validationSchema = yup.object().shape({
  [lastPathMember(CreateOrganizationUnitFormValuesProxy.id).path]: yup
    .string()
    .trim()
    .test(
      lastPathMember(CreateOrganizationUnitFormValuesProxy.id).path,
      t(translationPath(lang.dialog.errors.wrongFormat)),
      (val) => val && val.match(/^([a-zA-Z0-9_]+)$/)
    )
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(CreateOrganizationUnitFormValuesProxy.name).path]: yup
    .string()
    .required(t(translationPath(lang._validations.requiredSubject)))
    .min(3, t(translationPath(lang.dialog.errors.minLen), { len: 3 }))
});
