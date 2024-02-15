import { isString } from "./isString";

describe("isString", () => {
  test("returns true when called with a string", () => {
    expect(isString("foo")).toBe(true);
    expect(isString(``)).toBe(true);
    expect(isString(String())).toBe(true);
  });

  test("returns false when called with a non-string argument", () => {
    expect(isString()).toBe(false);
    expect(isString(1)).toBe(false);
    expect(isString(0)).toBe(false);
    expect(isString(NaN)).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString(false)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString(new Date())).toBe(false);
    expect(isString(new Map())).toBe(false);
    expect(isString(new Set())).toBe(false);
    expect(isString(Buffer.from(""))).toBe(false);
    expect(isString(Symbol(""))).toBe(false);
    expect(isString(BigInt(1))).toBe(false);
    expect(isString(() => "")).toBe(false);
  });
});
