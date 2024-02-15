import { isUndefined } from "./isUndefined";

describe("isUndefined", () => {
  test("returns true when called with undefined", () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined()).toBe(true);
  });

  test("returns false when called with a non-undefined argument", () => {
    expect(isUndefined("undefined")).toBe(false);
    expect(isUndefined("")).toBe(false);
    expect(isUndefined(1)).toBe(false);
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined(NaN)).toBe(false);
    expect(isUndefined(true)).toBe(false);
    expect(isUndefined(false)).toBe(false);
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined({})).toBe(false);
    expect(isUndefined([])).toBe(false);
    expect(isUndefined(new Date())).toBe(false);
    expect(isUndefined(new Map())).toBe(false);
    expect(isUndefined(new Set())).toBe(false);
    expect(isUndefined(Buffer.from(""))).toBe(false);
    expect(isUndefined(Symbol(""))).toBe(false);
    expect(isUndefined(BigInt(1))).toBe(false);
    expect(isUndefined(() => "")).toBe(false);
  });
});
