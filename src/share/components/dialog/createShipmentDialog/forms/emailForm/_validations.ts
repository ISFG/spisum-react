import { lang, t } from "translation/i18n";
import * as yup from "yup";
import { lastPathMember, translationPath } from "../../../../../utils/getPath";
import { CreateShipmentFormValuesProxy } from "../../_types";

export const emailFormValidationSchema = yup.object().shape({
  [lastPathMember(CreateShipmentFormValuesProxy.recipient).path]: yup
    .string()
    .email(t(translationPath(lang.dialog.errors.invalidEmailFormat)))
    .required(t(translationPath(lang._validations.required)))
    .max(254, t(translationPath(lang.dialog.errors.maxLen), { len: 254 })),
  [lastPathMember(CreateShipmentFormValuesProxy.subject).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required)))
    .max(255, t(translationPath(lang.dialog.errors.maxLen), { len: 255 })),
  [lastPathMember(CreateShipmentFormValuesProxy.sender)
    .path]: yup
    .string()
    .required(t(translationPath(lang._validations.required)))
});
