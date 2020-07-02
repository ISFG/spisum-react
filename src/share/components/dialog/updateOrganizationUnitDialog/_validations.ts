import { lastPathMember, translationPath } from "share/utils/getPath";
import { validateErrors } from "share/utils/validation";
import { lang, t } from "translation/i18n";
import * as yup from "yup";
import {
  UpdateOrganizationUnitFormValues,
  UpdateOrganizationUnitFormValuesProxy
} from "./_types";

export const validate = (values: UpdateOrganizationUnitFormValues) =>
  validateErrors(validationSchema, values);

export const validationSchema = yup.object().shape({
  [lastPathMember(UpdateOrganizationUnitFormValuesProxy.name).path]: yup
    .string()
    .required(t(translationPath(lang._validations.requiredSubject)))
    .min(3, t(translationPath(lang.dialog.errors.minLen), { len: 3 }))
});
