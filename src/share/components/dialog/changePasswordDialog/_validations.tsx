import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import * as yup from "yup";
import { ChangePasswordFormValuesProxy } from "./_types";

export const changePasswordValidationSchema = yup.object().shape({
  [lastPathMember(ChangePasswordFormValuesProxy.oldPassword).path]: yup
    .string()
    .trim()
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(ChangePasswordFormValuesProxy.newPassword).path]: yup
    .string()
    .trim()
    .required(t(translationPath(lang._validations.required)))
    .min(4, t(translationPath(lang.dialog.errors.minLen), { len: 4 }))
    .test(
      "newPasswordCannotBeTheSame",
      t(translationPath(lang.dialog.errors.newPasswordCannotBeTheSame)),
      function (value) {
        return (
          this.parent[
            lastPathMember(ChangePasswordFormValuesProxy.oldPassword).path
          ] !== value
        );
      }
    ),
  [lastPathMember(ChangePasswordFormValuesProxy.newPassword2).path]: yup
    .string()
    .trim()
    .required(t(translationPath(lang._validations.required)))
    .min(4, t(translationPath(lang.dialog.errors.minLen), { len: 4 }))
    .test(
      "passwordsAreNotEqual",
      t(translationPath(lang.dialog.errors.newPasswordsAreNotEqual)),
      function (value) {
        return (
          this.parent[
            lastPathMember(ChangePasswordFormValuesProxy.newPassword).path
          ] === value
        );
      }
    )
});
