import { lang, t } from "translation/i18n";
import { characters, digits, letters } from "validation";
import * as yup from "yup";
import { lastPathMember, translationPath } from "../../../../../utils/getPath";
import { CreateShipmentFormValuesProxy } from "../../_types";

export const databoxFormValidationSchema = yup.object().shape({
  [lastPathMember(CreateShipmentFormValuesProxy.recipient).path]: characters(
    7
  ).required(t(translationPath(lang._validations.required))),
  [lastPathMember(CreateShipmentFormValuesProxy.subject).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required)))
    .max(255, t(translationPath(lang.dialog.errors.maxLen), { len: 255 })),
  [lastPathMember(CreateShipmentFormValuesProxy.toHands)
    .path]: yup
    .string()
    .max(30, t(translationPath(lang.dialog.errors.maxLen), { len: 30 })),
  [lastPathMember(CreateShipmentFormValuesProxy.legalTitleLaw).path]: digits(4),
  [lastPathMember(CreateShipmentFormValuesProxy.legalTitleYear).path]: digits(
    4
  ),
  [lastPathMember(CreateShipmentFormValuesProxy.legalTitleSect)
    .path]: characters(4),
  [lastPathMember(CreateShipmentFormValuesProxy.legalTitlePar).path]: digits(2),
  [lastPathMember(CreateShipmentFormValuesProxy.legalTitlePoint).path]: letters(
    2
  ),
  [lastPathMember(CreateShipmentFormValuesProxy.sender)
    .path]: yup
    .string()
    .required(t(translationPath(lang._validations.required)))
});
