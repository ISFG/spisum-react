import { SslProperties } from "core/api/models";
import { senderFormValidationObject } from "core/components/senderForm/_validations";
import { sslPropsProxy } from "core/types";
import moment from "moment";
import { mergeDateTime } from "share/utils/date";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { validateErrors } from "share/utils/validation";
import { lang, t } from "translation/i18n";
import { attachmentsCount, listCount, listCountAttachments } from "validation";
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
        return moment(deliveryDate).startOf("day").isBefore(moment());
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

        return moment(mergeDateTime(deliveryDate, deliveryTime)).isBefore(
          moment()
        );
      }
    ),
  [lastPathMember(sslPropsProxy.deliveryMode).path]: yup
    .string()
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(sslPropsProxy.attachmentsCount).path]: attachmentsCount(),
  [lastPathMember(sslPropsProxy.listCount).path]: listCount(),
  [lastPathMember(sslPropsProxy.listCountAttachments)
    .path]: listCountAttachments(),
  [lastPathMember(sslPropsProxy.attachmentsType).path]: yup
    .string()
    .max(50, t(translationPath(lang.dialog.errors.maxLen), { len: 50 })),
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
