import { SslProperties } from "core/api/models";
import { senderFormValidationObject } from "core/components/senderForm/_validations";
import {
  MOMENT_HELPER_DATE_FORMAT,
  MOMENT_HELPER_TIME_FORMAT
} from "core/helpers/api/document";
import { sslPropsProxy } from "core/types";
import moment from "moment";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { validateErrors } from "share/utils/validation";
import { lang, t } from "translation/i18n";
import { attachmentsCount } from "validation";
import * as yup from "yup";

export const validate = (values: SslProperties) =>
  validateErrors(validationSchema, values);

export const validationSchema = yup.object().shape({
  [lastPathMember(sslPropsProxy.deliveryDate).path]: yup
    .string()
    .nullable()
    .test(
      lastPathMember(sslPropsProxy.deliveryDate).path,
      t(translationPath(lang.dialog.errors.datePastOnly)),
      (deliveryDate) => {
        const date = moment(deliveryDate).format(MOMENT_HELPER_DATE_FORMAT);
        return moment(date).isBefore(moment());
      }
    ),
  [lastPathMember(sslPropsProxy.deliveryTime).path]: yup
    .string()
    .nullable()
    .test(
      lastPathMember(sslPropsProxy.deliveryTime).path,
      t(translationPath(lang.dialog.errors.timePastOnly)),
      function (deliveryTime) {
        const deliveryDate = this.parent.deliveryDate;
        if (!deliveryTime || !deliveryDate) return true;
        const date = moment(deliveryDate).format(MOMENT_HELPER_DATE_FORMAT);
        const time = moment(deliveryTime).format(MOMENT_HELPER_TIME_FORMAT);
        return moment(`${date} ${time}`).isBefore(moment());
      }
    ),
  [lastPathMember(sslPropsProxy.attachmentsType).path]: yup
    .string()
    .max(50, t(translationPath(lang.dialog.errors.maxLen), { len: 50 })),
  [lastPathMember(sslPropsProxy.attachmentsCount).path]: attachmentsCount(),
  [lastPathMember(sslPropsProxy.subject).path]: yup
    .string()
    .max(255, t(translationPath(lang.dialog.errors.maxLen), { len: 255 })),
  [lastPathMember(sslPropsProxy.senderIdent).path]: yup
    .string()
    .max(100, t(translationPath(lang.dialog.errors.maxLen), { len: 100 })),
  [lastPathMember(sslPropsProxy.senderSSID).path]: yup
    .string()
    .max(100, t(translationPath(lang.dialog.errors.maxLen), { len: 100 })),
  [lastPathMember(sslPropsProxy.settleToDate).path]: yup
    .string()
    .nullable()
    .test(
      lastPathMember(sslPropsProxy.settleToDate).path,
      t(translationPath(lang.dialog.errors.dateFutureOnly)),
      (val) => !val || moment(val).isSameOrAfter(moment(), "day")
    ),
  ...senderFormValidationObject
});
