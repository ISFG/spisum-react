import { secretDecrypt, secretEncrypt } from "../byteOperations";

describe("Test secret", () => {
  test("secretDecrypt", () => {
    const text = "Abjiek26ef*i";
    expect(text === secretDecrypt(secretEncrypt(text))).toBeTruthy();
  });
});
