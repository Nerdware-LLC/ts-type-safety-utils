import { isUnsafeNumber } from "./isUnsafeNumber.js";

describe("isUnsafeNumber", () => {
  test(`returns true when called with any "number" argument`, () => {
    expect(isUnsafeNumber(1)).toBe(true);
    expect(isUnsafeNumber(0)).toBe(true);
    expect(isUnsafeNumber(0.1)).toBe(true);
    expect(isUnsafeNumber(NaN)).toBe(true);
    expect(isUnsafeNumber(Number.NaN)).toBe(true);
    expect(isUnsafeNumber(Infinity)).toBe(true);
    expect(isUnsafeNumber(-Infinity)).toBe(true);
    expect(isUnsafeNumber(Number.POSITIVE_INFINITY)).toBe(true);
    expect(isUnsafeNumber(Number.NEGATIVE_INFINITY)).toBe(true);
    expect(isUnsafeNumber(Number.MAX_SAFE_INTEGER + 1)).toBe(true);
    expect(isUnsafeNumber(Number.MIN_SAFE_INTEGER - 1)).toBe(true);
    expect(isUnsafeNumber(Number.MAX_VALUE)).toBe(true);
    expect(isUnsafeNumber(Number.MIN_VALUE)).toBe(true);
    expect(isUnsafeNumber(Number.EPSILON)).toBe(true);
  });

  test(`returns false when called with a non-number argument`, () => {
    expect(isUnsafeNumber()).toBe(false);
    expect(isUnsafeNumber("number")).toBe(false);
    expect(isUnsafeNumber("")).toBe(false);
    expect(isUnsafeNumber(true)).toBe(false);
    expect(isUnsafeNumber(false)).toBe(false);
    expect(isUnsafeNumber(null)).toBe(false);
    expect(isUnsafeNumber(undefined)).toBe(false);
    expect(isUnsafeNumber({})).toBe(false);
    expect(isUnsafeNumber([])).toBe(false);
    expect(isUnsafeNumber(new Date())).toBe(false);
    expect(isUnsafeNumber(new Map())).toBe(false);
    expect(isUnsafeNumber(new Set())).toBe(false);
    expect(isUnsafeNumber(Buffer.from(""))).toBe(false);
    expect(isUnsafeNumber(Symbol(""))).toBe(false);
    expect(isUnsafeNumber(BigInt(1))).toBe(false);
    expect(isUnsafeNumber(() => "")).toBe(false);
  });
});
