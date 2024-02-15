import { safeJsonStringify } from "./safeJsonStringify.js";

describe("safeJsonStringify", () => {
  test("stringifies a simple object without errors", () => {
    expect(safeJsonStringify({ name: "John", age: 30 })).toEqual('{"name":"John","age":30}');
  });

  test("returns stringified JSON without throwing when given BigInt's and circular refs", () => {
    const input: Record<string, unknown> = { a: "A", b: BigInt(1) };
    input.c = input;

    // Ensure the regular JSON.stringify throws when given the input:
    expect(() => JSON.stringify(input)).toThrow(TypeError);
    // Ensure it works when called with no replacer function:
    expect(safeJsonStringify(input)).toBe(`{"a":"A","b":"1n","c":"[Circular]"}`);
    // Ensure it works when called with a replacer function:
    expect(
      safeJsonStringify(input, (_key: string, value: unknown) =>
        value === "A" ? "REPLACED" : value
      )
    ).toBe(`{"a":"REPLACED","b":"1n","c":"[Circular]"}`);
  });
});
