import { lang, t } from "translation/i18n";
import * as yup from "yup";
import { translationPath } from "../getPath";
import { validateErrors } from "../validation";

describe("Test fetch functions", () => {
  test("validateErrors", () => {
    const validationSchema = yup.object().shape({
      password: yup
        .string()
        .trim()
        .required(t(translationPath(lang._validations.inputPassword))),
      username: yup
        .string()
        .trim()
        .required(t(translationPath(lang._validations.inputUsername)))
    });

    expect(
      validateErrors(validationSchema, { password: "pass", username: "name" })
    ).toMatchObject({});
    expect(
      validateErrors(validationSchema, { password: "", username: "" })
    ).toMatchObject({
      password: t(translationPath(lang._validations.inputPassword)),
      username: t(translationPath(lang._validations.inputUsername))
    });
    expect(
      validateErrors(validationSchema, { password: "   ", username: "   " })
    ).toMatchObject({
      password: t(translationPath(lang._validations.inputPassword)),
      username: t(translationPath(lang._validations.inputUsername))
    });
    expect(
      validateErrors(validationSchema, { password: " ", username: "name" })
    ).toMatchObject({
      password: t(translationPath(lang._validations.inputPassword))
    });
  });
});
