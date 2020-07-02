import "";

describe("Extensions test", () => {
  test("trimEnd", () => {
    expect("/address/".trimEnd("/")).toBe("/address");
    expect("/address".trimEnd("/")).toBe("/address");
    expect("/address".trimEnd("address")).toBe("/");
  });
});
