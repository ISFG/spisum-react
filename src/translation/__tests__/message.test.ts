import { codeMessage } from "../message";
import { t, lang } from "../i18n";
import { translationPath } from "share/utils/getPath";

describe("Test message functions", () => {
  test("codeMessage", () => {
    expect(codeMessage(null)).toBeNull();
    expect(codeMessage(undefined as any)).toBeNull();
    expect(codeMessage("")).toBeNull();
    expect(codeMessage("XXX")).toMatch(
      t(translationPath(lang._common.codes[0]))
    );
    expect(codeMessage("400")).toMatch(
      t(translationPath(lang._common.codes[400]))
    );
    expect(
      codeMessage({
        code: "XXX",
        message: null
      })
    ).toMatch(t(translationPath(lang._common.codes[0])));
    expect(
      codeMessage({
        code: "XXX",
        message: "some message"
      })
    ).toMatch(t(translationPath(lang._common.codes[0])));
    expect(
      codeMessage({
        code: null,
        message: "some message"
      })
    ).toMatch("some message");
  });
});
