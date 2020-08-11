import { lang, t } from "translation/i18n";
import * as yup from "yup";
import { lastPathMember, translationPath } from "../../../../../utils/getPath";
import { isEmptyString } from "../../../../../utils/utils";
import { validateErrors } from "../../../../../utils/validation";
import {
  ShipmentFormValues,
  shipmentPersonalFormValuesProxy
} from "../../_types";

const MAX_STRING_LENGTH = 100;

export const validate = (values: ShipmentFormValues) =>
  validateErrors(personallyFormValidationSchema, values);

export const personallyFormValidationSchema = yup.object().shape({
  [lastPathMember(shipmentPersonalFormValuesProxy.address1).path]: yup
    .string()
    .test(
      "oneOfRequired",
      t(translationPath(lang._validations.requiredAdress)),
      function () {
        return (
          !isEmptyString(
            this.parent[
              lastPathMember(shipmentPersonalFormValuesProxy.address1).path
            ]
          ) ||
          !isEmptyString(
            this.parent[
              lastPathMember(shipmentPersonalFormValuesProxy.address2).path
            ]
          ) ||
          !isEmptyString(
            this.parent[
              lastPathMember(shipmentPersonalFormValuesProxy.address3).path
            ]
          ) ||
          !isEmptyString(
            this.parent[
              lastPathMember(shipmentPersonalFormValuesProxy.address4).path
            ]
          )
        );
      }
    )
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(shipmentPersonalFormValuesProxy.address2)
    .path]: yup
    .string()
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(shipmentPersonalFormValuesProxy.address3)
    .path]: yup
    .string()
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(shipmentPersonalFormValuesProxy.address4)
    .path]: yup
    .string()
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(shipmentPersonalFormValuesProxy.addressStreet).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required)))
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(shipmentPersonalFormValuesProxy.addressCity).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required)))
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(shipmentPersonalFormValuesProxy.addressZip).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required)))
    .max(10, t(translationPath(lang.dialog.errors.maxLen), { len: 10 })),
  [lastPathMember(shipmentPersonalFormValuesProxy.addressState)
    .path]: yup
    .string()
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    )
});
