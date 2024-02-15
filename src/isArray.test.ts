import { isArray } from "./isArray";

describe("isArray", () => {
  test("returns true when called with an array", () => {
    expect(isArray([])).toBe(true);
    expect(isArray(Array(0))).toBe(true);
  });

  test("returns false when called with a non-array argument", () => {
    expect(isArray()).toBe(false);
    expect(isArray("object")).toBe(false);
    expect(isArray("")).toBe(false);
    expect(isArray(1)).toBe(false);
    expect(isArray(0)).toBe(false);
    expect(isArray(NaN)).toBe(false);
    expect(isArray(true)).toBe(false);
    expect(isArray(false)).toBe(false);
    expect(isArray(null)).toBe(false);
    expect(isArray(undefined)).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray(new Date())).toBe(false);
    expect(isArray(new Map())).toBe(false);
    expect(isArray(new Set())).toBe(false);
    expect(isArray(Buffer.from(""))).toBe(false);
    expect(isArray(Symbol(""))).toBe(false);
    expect(isArray(BigInt(1))).toBe(false);
    expect(isArray(() => "")).toBe(false);
  });
});
