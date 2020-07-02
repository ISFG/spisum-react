import { SslAnalog } from "core/api/models";
import { senderFormValidationObject } from "core/components/senderForm/_validations";
import { sslAnalogPropsProxy, sslPropsProxy } from "core/types";
import moment from "moment";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { validateErrors } from "share/utils/validation";
import { lang, t } from "translation/i18n";
import { attachmentsCount } from "validation";
import * as yup from "yup";

export const validate = (values: SslAnalog) =>
  validateErrors(validationSchema, values);

export const validationSchema = yup.object().shape({
  [lastPathMember(sslPropsProxy.attachmentsCount).path]: attachmentsCount(),
  [lastPathMember(sslAnalogPropsProxy.attachmentsType).path]: yup
    .string()
    .max(50, t(translationPath(lang.dialog.errors.maxLen), { len: 50 })),
  [lastPathMember(sslAnalogPropsProxy.deliveryDate).path]: yup
    .string()
    .nullable()
    .test(
      lastPathMember(sslAnalogPropsProxy.deliveryDate).path,
      t(translationPath(lang.dialog.errors.datePastOnly)),
      (deliveryDate) => {
        const date = moment(deliveryDate).format("YYYY-MM-DD");
        return moment(date).isBefore(moment());
      }
    ),
  [lastPathMember(sslAnalogPropsProxy.deliveryMode)
    .path]: yup.string().required(t(translationPath(lang._validations.required))),
  [lastPathMember(sslAnalogPropsProxy.deliveryTime).path]: yup
    .string()
    .nullable()
    .test(
      lastPathMember(sslAnalogPropsProxy.deliveryTime).path,
      t(translationPath(lang.dialog.errors.timePastOnly)),
      function (deliveryTime) {
        const deliveryDate = this.parent.deliveryDate;
        if (!deliveryTime || !deliveryDate) return true;
        const date = moment(deliveryDate).format("YYYY-MM-DD");
        const time = moment(deliveryTime).format("HH:mm");
        return moment(`${date} ${time}`).isBefore(moment());
      }
    ),
  [lastPathMember(sslAnalogPropsProxy.senderSSID).path]: yup
    .string()
    .max(100, t(translationPath(lang.dialog.errors.maxLen), { len: 100 })),
  [lastPathMember(sslAnalogPropsProxy.senderIdent).path]: yup
    .string()
    .max(100, t(translationPath(lang.dialog.errors.maxLen), { len: 100 })),
  [lastPathMember(sslAnalogPropsProxy.settleToDate).path]: yup
    .string()
    .nullable()
    .test(
      lastPathMember(sslAnalogPropsProxy.settleToDate).path,
      t(translationPath(lang.dialog.errors.dateFutureOnly)),
      (val) => (val ? moment(val).isSameOrAfter(moment(), "day") : true)
    ),
  [lastPathMember(sslAnalogPropsProxy.subject).path]: yup
    .string()
    .max(255, t(translationPath(lang.dialog.errors.maxLen), { len: 255 })),
  ...senderFormValidationObject
});
