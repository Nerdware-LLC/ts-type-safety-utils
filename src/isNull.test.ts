import { isNull } from "./isNull.js";

describe("isNull", () => {
  test("returns true when called with null", () => {
    expect(isNull(null)).toBe(true);
  });

  test("returns false when called with a non-null argument", () => {
    expect(isNull()).toBe(false);
    expect(isNull("null")).toBe(false);
    expect(isNull("")).toBe(false);
    expect(isNull(1)).toBe(false);
    expect(isNull(0)).toBe(false);
    expect(isNull(NaN)).toBe(false);
    expect(isNull(true)).toBe(false);
    expect(isNull(false)).toBe(false);
    expect(isNull(undefined)).toBe(false);
    expect(isNull({})).toBe(false);
    expect(isNull([])).toBe(false);
    expect(isNull(new Date())).toBe(false);
    expect(isNull(new Map())).toBe(false);
    expect(isNull(new Set())).toBe(false);
    expect(isNull(Buffer.from(""))).toBe(false);
    expect(isNull(Symbol(""))).toBe(false);
    expect(isNull(BigInt(1))).toBe(false);
    expect(isNull(() => "")).toBe(false);
  });
});
