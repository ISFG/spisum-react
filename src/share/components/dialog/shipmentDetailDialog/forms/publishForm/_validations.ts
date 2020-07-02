import moment from "moment";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import * as yup from "yup";
import { validateErrors } from "../../../../../utils/validation";
import {
  ShipmentFormValues,
  shipmentPublishFormValuesProxy
} from "../../_types";

export const validate = (values: ShipmentFormValues) =>
  validateErrors(validationSchema, values);

const MAX_STRING_LENGTH = 255;
const MIN_COUNT = 1;

export const validationSchema = yup.object().shape({
  [lastPathMember(shipmentPublishFormValuesProxy.dateFrom).path]: yup
    .string()
    .nullable()
    .required(t(translationPath(lang._validations.requiredDateFrom)))
    .test(
      lastPathMember(shipmentPublishFormValuesProxy.dateFrom).path,
      t(translationPath(lang.dialog.errors.dateFutureOnly)),
      (val) => !val || moment(val).isSameOrAfter(moment(), "day")
    ),
  [lastPathMember(shipmentPublishFormValuesProxy.note).path]: yup.string().max(
    MAX_STRING_LENGTH,
    t(translationPath(lang.dialog.errors.maxLen), {
      len: MAX_STRING_LENGTH
    })
  ),
  [lastPathMember(shipmentPublishFormValuesProxy.days).path]: yup
    .string()
    .test(
      lastPathMember(shipmentPublishFormValuesProxy.days).path,
      t(translationPath(lang.dialog.errors.min), { val: MIN_COUNT }),
      (val) => val >= MIN_COUNT || val === ""
    )
});
