import * as yup from "yup";
import { lang, t } from "../../../../../../translation/i18n";
import { lastPathMember, translationPath } from "../../../../../utils/getPath";
import { validateErrors } from "../../../../../utils/validation";
import { ShipmentFormValues, shipmentFormValuesProxy } from "../../_types";

export const validate = (values: ShipmentFormValues) =>
  validateErrors(validationSchema, values);

export const validationSchema = yup.object().shape({
  [lastPathMember(shipmentFormValuesProxy.subject).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required)))
    .max(255, t(translationPath(lang.dialog.errors.maxLen), { len: 255 })),
  [lastPathMember(shipmentFormValuesProxy.recipient).path]: yup
    .string()
    .email(t(translationPath(lang.dialog.errors.invalidEmailFormat)))
    .required(t(translationPath(lang._validations.required)))
    .max(254, t(translationPath(lang.dialog.errors.maxLen), { len: 254 }))
});
