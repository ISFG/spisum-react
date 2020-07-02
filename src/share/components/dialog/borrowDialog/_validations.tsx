import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import * as yup from "yup";
import { BorrowFormValuesProxy } from "./_types";

export const borrowDialogValidationSchema = yup.object().shape({
  [lastPathMember(BorrowFormValuesProxy.group).path]: yup
    .string()
    .trim()
    .required(t(translationPath(lang._validations.required))),
  [lastPathMember(BorrowFormValuesProxy.user).path]: yup
    .string()
    .trim()
    .required(t(translationPath(lang._validations.required)))
});
