import { lastPathMember, translationPath } from "share/utils/getPath";
import { validateErrors } from "share/utils/validation";
import { lang, t } from "translation/i18n";
import { characters, digits, letters } from "validation";
import * as yup from "yup";
import { ShipmentFormValues, shipmentFormValuesProxy } from "../../_types";

export const validate = (values: ShipmentFormValues) =>
  validateErrors(validationSchema, values);

export const validationSchema = yup.object().shape({
  [lastPathMember(shipmentFormValuesProxy.subject).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required)))
    .max(255, t(translationPath(lang.dialog.errors.maxLen), { len: 255 })),
  [lastPathMember(shipmentFormValuesProxy.toHands).path]: yup
    .string()
    .max(30, t(translationPath(lang.dialog.errors.maxLen), { len: 30 })),
  [lastPathMember(shipmentFormValuesProxy.recipient).path]: characters(
    7
  ).required(t(translationPath(lang._validations.required))),
  [lastPathMember(shipmentFormValuesProxy.legalTitleLaw).path]: digits(4),
  [lastPathMember(shipmentFormValuesProxy.legalTitleYear).path]: digits(4),
  [lastPathMember(shipmentFormValuesProxy.legalTitleSect).path]: characters(4),
  [lastPathMember(shipmentFormValuesProxy.legalTitlePar).path]: digits(2),
  [lastPathMember(shipmentFormValuesProxy.legalTitlePoint).path]: letters(2)
});
