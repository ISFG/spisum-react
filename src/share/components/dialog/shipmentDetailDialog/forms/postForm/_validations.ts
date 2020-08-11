import { PostType } from "enums";
import { lang, t } from "translation/i18n";
import * as yup from "yup";
import { lastPathMember, translationPath } from "../../../../../utils/getPath";
import { isEmptyString } from "../../../../../utils/utils";
import { validateErrors } from "../../../../../utils/validation";
import { CreateShipmentFormValuesProxy } from "../../../createShipmentDialog/_types";
import { ShipmentFormValues, shipmentPostFormValuesProxy } from "../../_types";

const MAX_STRING_LENGTH = 100;

export const validate = (values: ShipmentFormValues) =>
  validateErrors(validationSchema, values);

export const validationSchema = yup.object().shape({
  [lastPathMember(shipmentPostFormValuesProxy.address1).path]: yup
    .string()
    .test(
      "oneOfRequired",
      t(translationPath(lang._validations.requiredAdress)),
      function () {
        return (
          !isEmptyString(
            this.parent[
              lastPathMember(shipmentPostFormValuesProxy.address1).path
            ]
          ) ||
          !isEmptyString(
            this.parent[
              lastPathMember(shipmentPostFormValuesProxy.address2).path
            ]
          ) ||
          !isEmptyString(
            this.parent[
              lastPathMember(shipmentPostFormValuesProxy.address3).path
            ]
          ) ||
          !isEmptyString(
            this.parent[
              lastPathMember(shipmentPostFormValuesProxy.address4).path
            ]
          )
        );
      }
    )
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(shipmentPostFormValuesProxy.address2).path]: yup
    .string()
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(shipmentPostFormValuesProxy.address3).path]: yup
    .string()
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(shipmentPostFormValuesProxy.address4).path]: yup
    .string()
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(shipmentPostFormValuesProxy.addressStreet).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required)))
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(shipmentPostFormValuesProxy.addressCity).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required)))
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(shipmentPostFormValuesProxy.addressZip).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required)))
    .max(10, t(translationPath(lang.dialog.errors.maxLen), { len: 10 })),
  [lastPathMember(shipmentPostFormValuesProxy.addressState)
    .path]: yup
    .string()
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(shipmentPostFormValuesProxy.postTypeOther)
    .path]: yup
    .string()
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(shipmentPostFormValuesProxy.postItemTypeOther)
    .path]: yup
    .string()
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(shipmentPostFormValuesProxy.postItemWeight)
    .path]: yup
    .string()
    .test(
      lastPathMember(shipmentPostFormValuesProxy.postItemWeight).path,
      t(translationPath(lang._validations.positiveNumber)),
      (val) => {
        return val === "" || parseFloat(val) > 0;
      }
    ),
  [lastPathMember(shipmentPostFormValuesProxy.postItemPrice)
    .path]: yup
    .string()
    .test(
      lastPathMember(shipmentPostFormValuesProxy.postItemPrice).path,
      t(translationPath(lang._validations.positiveNumber)),
      (val) => {
        return val === "" || parseFloat(val) > 0;
      }
    ),
  [lastPathMember(shipmentPostFormValuesProxy.postType)
    .path]: yup
    .array()
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(shipmentPostFormValuesProxy.postItemCashOnDelivery)
    .path]: yup
    .string()
    .when(lastPathMember(shipmentPostFormValuesProxy.postType).path, {
      is: (postType) => postType.includes(PostType.cashOnDelivery),
      then: yup
        .string()
        .required(t(translationPath(lang._validations.required)))
        .test(
          lastPathMember(CreateShipmentFormValuesProxy.postItemCashOnDelivery)
            .path,
          t(translationPath(lang.dialog.errors.min), { val: 1 }),
          (val) => {
            return val > 0;
          }
        )
    }),
  [lastPathMember(shipmentPostFormValuesProxy.postItemStatedPrice)
    .path]: yup
    .string()
    .when(lastPathMember(shipmentPostFormValuesProxy.postType).path, {
      is: (postType) => postType.includes(PostType.price),
      then: yup
        .string()
        .required(t(translationPath(lang._validations.required)))
        .test(
          lastPathMember(shipmentPostFormValuesProxy.postItemStatedPrice).path,
          t(translationPath(lang.dialog.errors.min), { val: 1 }),
          (val) => {
            return val > 0;
          }
        )
    })
});
