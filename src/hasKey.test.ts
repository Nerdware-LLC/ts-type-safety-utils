import { hasKey } from "./hasKey";

describe("hasKey()", () => {
  // STRING KEY
  test("returns true when the provided object has the provided string key", () => {
    expect(hasKey({ foo: "" }, "foo")).toBe(true);
    expect(hasKey({ "": "" }, "")).toBe(true); // works with empty strings
  });
  test("returns false when the provided object does not have the provided string key", () => {
    expect(hasKey({ foo: "" }, "NOPE")).toBe(false);
  });

  // NUMBER KEY
  test("returns true when the provided object has the provided number key", () => {
    expect(hasKey({ 0: "" }, 0)).toBe(true);
  });
  test("returns false when the provided object does not have the provided number key", () => {
    expect(hasKey({ 0: "" }, 1)).toBe(false);
  });

  // SYMBOL KEY
  test("returns true when the provided object has the provided symbol key", () => {
    const sym = Symbol("foo");
    expect(hasKey({ [sym]: "" }, sym)).toBe(true);
  });
  test("returns false when the provided object does not have the provided symbol key", () => {
    const sym = Symbol("foo");
    expect(hasKey({ [sym]: "" }, Symbol("NOPE"))).toBe(false);
  });

  // EDGE CASES
  test("returns false when the provided object has no keys", () => {
    expect(hasKey({}, "")).toBe(false);
    expect(hasKey({}, "foo")).toBe(false);
  });

  // DESTRUCTIVE TEST CASES
  test("throws an error when called with invalid arguments", () => {
    expect(() => hasKey(null as any, "foo")).toThrow();
  });
});
