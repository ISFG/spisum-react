import { PostType } from "enums";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import * as yup from "yup";
import { isEmptyString } from "../../../../../utils/utils";
import { shipmentPostFormValuesProxy } from "../../../shipmentDetailDialog/_types";
import { CreateShipmentFormValuesProxy } from "../../_types";

const MAX_STRING_LENGTH = 100;

export const postFormValidationSchema = yup.object().shape({
  [lastPathMember(CreateShipmentFormValuesProxy.address1).path]: yup
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
    .max(10, t(translationPath(lang.dialog.errors.maxLen), { len: 10 })),
  [lastPathMember(CreateShipmentFormValuesProxy.addressState)
    .path]: yup
    .string()
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(CreateShipmentFormValuesProxy.postType)
    .path]: yup
    .array()
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(CreateShipmentFormValuesProxy.postItemWeight).path]: yup
    .number()
    .typeError(t(translationPath(lang._validations.number)))
    .nullable()
    .positive(t(translationPath(lang._validations.positiveNumber)))
    .transform((value: string, originalValue: string) =>
      originalValue.trim() === "" ? null : value
    ),
  [lastPathMember(CreateShipmentFormValuesProxy.postItemTypeOther)
    .path]: yup
    .string()
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(CreateShipmentFormValuesProxy.postTypeOther)
    .path]: yup
    .string()
    .max(
      MAX_STRING_LENGTH,
      t(translationPath(lang.dialog.errors.maxLen), { len: MAX_STRING_LENGTH })
    ),
  [lastPathMember(CreateShipmentFormValuesProxy.postItemCashOnDelivery)
    .path]: yup
    .string()
    .when(lastPathMember(CreateShipmentFormValuesProxy.postType).path, {
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
  [lastPathMember(CreateShipmentFormValuesProxy.postItemStatedPrice)
    .path]: yup
    .string()
    .when(lastPathMember(CreateShipmentFormValuesProxy.postType).path, {
      is: (postType) => postType.includes(PostType.price),
      then: yup
        .string()
        .required(t(translationPath(lang._validations.required)))
        .test(
          lastPathMember(CreateShipmentFormValuesProxy.postItemStatedPrice)
            .path,
          t(translationPath(lang.dialog.errors.min), { val: 1 }),
          (val) => {
            return val > 0;
          }
        )
    })
});
