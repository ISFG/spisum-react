import { default as i18n } from "i18next";
import { translationPath } from "share/utils/getPath";
import { ErrorType } from "../types";
import { t } from "./i18n";
import lang from "./lang";

export const codeMessage = (
  mixed: ErrorType | string | null
): string | null => {
  if (typeof mixed === "undefined" || !mixed) return null;

  let code: string | null;
  let message: string | null = null;

  if (typeof mixed === "string") {
    code = mixed;
  } else {
    code = mixed.code;
    message = mixed.message;
  }

  if (!code && message) return message;

  switch (code) {
    /* // for custom codes
    case lastPathMember(lang._common.codes.E_AUTH).path:
      return i18n.t(`_common:codes.${code}`) as string;
    */
    default:
      const targetCode = `codes.${code}`;
      const messageFromCode =
        code && (i18n.t(`_common:${targetCode}`) as string);
      return !messageFromCode || messageFromCode === targetCode
        ? (t(translationPath(lang._common.codes[0])) as string)
        : messageFromCode;
  }
};
