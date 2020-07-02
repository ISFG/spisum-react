import { lang, t } from "translation/i18n";
import * as yup from "yup";
import { lastPathMember, translationPath } from "../../../../../utils/getPath";
import { CreateShipmentFormValuesProxy } from "../../_types";

const MAX_STRING_LENGTH = 100;

export const personallyFormValidationSchema = yup.object().shape({
  [lastPathMember(CreateShipmentFormValuesProxy.address1).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required)))
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(CreateShipmentFormValuesProxy.address2)
    .path]: yup
    .string()
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(CreateShipmentFormValuesProxy.address3)
    .path]: yup
    .string()
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(CreateShipmentFormValuesProxy.address4)
    .path]: yup
    .string()
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(CreateShipmentFormValuesProxy.addressStreet).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required)))
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(CreateShipmentFormValuesProxy.addressCity).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required)))
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(CreateShipmentFormValuesProxy.addressZip).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required)))
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(CreateShipmentFormValuesProxy.addressState)
    .path]: yup
    .string()
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    )
});
