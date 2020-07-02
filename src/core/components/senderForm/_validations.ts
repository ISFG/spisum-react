import { sslPropsProxy } from "core/types";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import * as yup from "yup";

export const senderFormValidationObject = {
  [lastPathMember(sslPropsProxy.sender_name).path]: yup
    .string()
    .max(100, t(translationPath(lang.dialog.errors.maxLen), { len: 100 })),
  [lastPathMember(sslPropsProxy.sender_address).path]: yup
    .string()
    .max(255, t(translationPath(lang.dialog.errors.maxLen), { len: 255 })),
  [lastPathMember(sslPropsProxy.sender_contact).path]: yup
    .string()
    .max(100, t(translationPath(lang.dialog.errors.maxLen), { len: 100 })),
  [lastPathMember(sslPropsProxy.sender_orgName).path]: yup
    .string()
    .max(100, t(translationPath(lang.dialog.errors.maxLen), { len: 100 })),
  [lastPathMember(sslPropsProxy.sender_orgUnit).path]: yup
    .string()
    .max(100, t(translationPath(lang.dialog.errors.maxLen), { len: 100 })),
  [lastPathMember(sslPropsProxy.sender_job).path]: yup
    .string()
    .max(100, t(translationPath(lang.dialog.errors.maxLen), { len: 100 }))
};
