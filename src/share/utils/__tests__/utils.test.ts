import { isEmptyString } from "../utils";

describe("Test utils functions", () => {
  test("isEmptyString", () => {
    expect(isEmptyString(null)).toBeTruthy();
    expect(isEmptyString(undefined)).toBeTruthy();
    expect(isEmptyString("")).toBeTruthy();
    expect(isEmptyString("     ")).toBeTruthy();
    expect(isEmptyString("  ab   ")).toBeFalsy();
  });
});
