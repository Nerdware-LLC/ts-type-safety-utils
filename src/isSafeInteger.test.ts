import { isSafeInteger } from "./isSafeInteger.js";

describe("isSafeInteger", () => {
  test("returns true when called with a safe integer", () => {
    expect(isSafeInteger(1)).toBe(true);
    expect(isSafeInteger(0)).toBe(true);
  });

  test("returns false when called with a non-safe-integer argument", () => {
    expect(isSafeInteger()).toBe(false);
    expect(isSafeInteger("number")).toBe(false);
    expect(isSafeInteger("")).toBe(false);
    expect(isSafeInteger(0.1)).toBe(false);
    expect(isSafeInteger(NaN)).toBe(false);
    expect(isSafeInteger(Number.NaN)).toBe(false);
    expect(isSafeInteger(Infinity)).toBe(false);
    expect(isSafeInteger(-Infinity)).toBe(false);
    expect(isSafeInteger(Number.POSITIVE_INFINITY)).toBe(false);
    expect(isSafeInteger(Number.NEGATIVE_INFINITY)).toBe(false);
    expect(isSafeInteger(Number.MAX_SAFE_INTEGER + 1)).toBe(false);
    expect(isSafeInteger(Number.MIN_SAFE_INTEGER - 1)).toBe(false);
    expect(isSafeInteger(Number.MAX_VALUE)).toBe(false);
    expect(isSafeInteger(Number.MIN_VALUE)).toBe(false);
    expect(isSafeInteger(Number.EPSILON)).toBe(false);
    expect(isSafeInteger(true)).toBe(false);
    expect(isSafeInteger(false)).toBe(false);
    expect(isSafeInteger(null)).toBe(false);
    expect(isSafeInteger(undefined)).toBe(false);
    expect(isSafeInteger({})).toBe(false);
    expect(isSafeInteger([])).toBe(false);
    expect(isSafeInteger(new Date())).toBe(false);
    expect(isSafeInteger(new Map())).toBe(false);
    expect(isSafeInteger(new Set())).toBe(false);
    expect(isSafeInteger(Buffer.from(""))).toBe(false);
    expect(isSafeInteger(Symbol(""))).toBe(false);
    expect(isSafeInteger(BigInt(1))).toBe(false);
    expect(isSafeInteger(() => "")).toBe(false);
  });
});
