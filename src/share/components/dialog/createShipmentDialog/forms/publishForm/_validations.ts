import moment from "moment";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import * as yup from "yup";
import { CreateShipmentFormValuesProxy } from "../../_types";

const MAX_STRING_LENGTH = 255;
const MIN_COUNT = 1;

export const publishFormValidationSchema = yup.object().shape({
  [lastPathMember(CreateShipmentFormValuesProxy.dateFrom).path]: yup
    .string()
    .nullable()
    .required(t(translationPath(lang._validations.requiredDateFrom)))
    .test(
      lastPathMember(CreateShipmentFormValuesProxy.dateFrom).path,
      t(translationPath(lang.dialog.errors.dateFutureOnly)),
      (val) => !val || moment(val).isSameOrAfter(moment(), "day")
    ),
  [lastPathMember(CreateShipmentFormValuesProxy.note).path]: yup.string().max(
    MAX_STRING_LENGTH,
    t(translationPath(lang.dialog.errors.maxLen), {
      len: MAX_STRING_LENGTH
    })
  ),
  [lastPathMember(CreateShipmentFormValuesProxy.days).path]: yup
    .string()
    .test(
      lastPathMember(CreateShipmentFormValuesProxy.days).path,
      t(translationPath(lang.dialog.errors.min), { val: MIN_COUNT }),
      (val) => val >= MIN_COUNT || val === ""
    )
});
