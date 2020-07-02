import {
  classPath,
  createProxy,
  lastPathMember,
  translationPath
} from "../getPath";

describe("Test getPath functions", () => {
  interface TestInterface {
    Value1: string;
    Value2: boolean;
    Value3: {
      Subvalue1: number;
    };
  }
  const proxy = createProxy<TestInterface>();

  test("classPath", () => {
    expect(classPath(proxy.Value1).path).toMatch("Value1");
    expect(classPath(proxy.Value3.Subvalue1).path).toMatch("Value3.Subvalue1");
  });

  test("lastPathMember", () => {
    expect(lastPathMember(proxy.Value1).path).toMatch("Value1");
    expect(lastPathMember(proxy.Value3.Subvalue1).path).toMatch("Subvalue1");
  });

  test("translationPath", () => {
    expect(translationPath(proxy.Value1).path).toMatch("Value1");
    expect(translationPath(proxy.Value3.Subvalue1).path).toMatch(
      "Value3:Subvalue1"
    );
  });
});
