import { sslPropsProxy } from "core/types";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { t } from "translation/i18n";
import lang from "translation/lang";
import * as yup from "yup";

const moreThenZero = (propName: string) =>
  yup
    .string()
    .test(
      propName,
      t(translationPath(lang.dialog.errors.min), { val: 0 }),
      (val) => +val >= 0
    );

export const listCount = () =>
  moreThenZero(lastPathMember(sslPropsProxy.listCount).path);

export const attachmentsCount = () =>
  moreThenZero(lastPathMember(sslPropsProxy.attachmentsCount).path);

export const listCountAttachments = () =>
  moreThenZero(lastPathMember(sslPropsProxy.listCountAttachments).path);

export const digits = (count: number, message?: string) => {
  const defaultMessage = t(translationPath(lang.dialog.errors.wrongFormat));

  return yup
    .string()
    .matches(/^[0-9]*$/, message || defaultMessage)
    .max(count, t(translationPath(lang.dialog.errors.maxLen), { len: count }));
};

export const letters = (count: number, message?: string) => {
  const defaultMessage = t(translationPath(lang.dialog.errors.wrongFormat));

  return yup
    .string()
    .matches(/^[a-z]*$/, message || defaultMessage)
    .max(count, t(translationPath(lang.dialog.errors.maxLen), { len: count }));
};

export const characters = (count: number, message?: string) => {
  const defaultMessage = t(translationPath(lang.dialog.errors.wrongFormat));

  return yup
    .string()
    .matches(/^[a-z0-9]*$/, message || defaultMessage)
    .max(count, t(translationPath(lang.dialog.errors.maxLen), { len: count }));
};
