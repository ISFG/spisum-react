import { lastPathMember, translationPath } from "share/utils/getPath";
import { validateErrors } from "share/utils/validation";
import { lang, t } from "translation/i18n";
import * as yup from "yup";
import { UserFormValuesProxy, UserFormValuesType } from "./_types";

export const getValidationMethod = (isUserEdit: boolean) => {
  return isUserEdit ? userEditValidation : userCreateValidation;
};

const defaultValidationSchema = {
  [lastPathMember(UserFormValuesProxy.id).path]: yup
    .string()
    .trim()
    .test(
      lastPathMember(UserFormValuesProxy.id).path,
      t(translationPath(lang.dialog.errors.incorrectFormat), {
        val: t(translationPath(lang.general.id))
      }),
      (val) => val && val.match(/^([a-zA-Z0-9_]+)$/)
    )
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(UserFormValuesProxy.firstName).path]: yup
    .string()
    .trim()
    .min(3, t(translationPath(lang.dialog.errors.minLen), { len: 3 }))
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(UserFormValuesProxy.email).path]: yup
    .string()
    .trim()
    .email(t(translationPath(lang.dialog.errors.invalidEmailFormat)))
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(UserFormValuesProxy.mainGroup).path]: yup
    .string()
    .trim()
    .required(t(translationPath(lang._validations.required)))
};

const createUserValidationSchema = {
  ...defaultValidationSchema,
  [lastPathMember(UserFormValuesProxy.password).path]: yup
    .string()
    .trim()
    .min(5, t(translationPath(lang.dialog.errors.minLen), { len: 5 }))
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(UserFormValuesProxy.passwordAgain).path]: yup
    .string()
    .trim()
    .test(
      lastPathMember(UserFormValuesProxy.passwordAgain).path,
      t(translationPath(lang.dialog.errors.passwordsAreNotEqual)),
      function (passwordAgain) {
        const password = this.parent.password;
        return password === passwordAgain;
      }
    )
    .required(t(translationPath(lang._validations.required)))
};

const editUserValidationSchema = {
  ...defaultValidationSchema,
  [lastPathMember(UserFormValuesProxy.password).path]: yup
    .string()
    .trim()
    .test(
      lastPathMember(UserFormValuesProxy.password).path,
      t(translationPath(lang.dialog.errors.minLen), { len: 5 }),
      (val) => !val || val.length > 4
    ),
  [lastPathMember(UserFormValuesProxy.passwordAgain).path]: yup
    .string()
    .trim()
    .test(
      lastPathMember(UserFormValuesProxy.passwordAgain).path,
      t(translationPath(lang.dialog.errors.passwordsAreNotEqual)),
      function (passwordAgain) {
        const password = this.parent.password;
        return password === passwordAgain;
      }
    )
};

export const userCreateValidation = (values: UserFormValuesType) =>
  validateErrors(yup.object().shape(createUserValidationSchema), values);

export const userEditValidation = (values: UserFormValuesType) =>
  validateErrors(yup.object().shape(editUserValidationSchema), values);
