import { isPlainObject } from "./isPlainObject.js";

describe("isPlainObject", () => {
  test("returns true when called with a record-like object", () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
  });

  test("returns false when called with a non-record-like argument", () => {
    expect(isPlainObject()).toBe(false);
    expect(isPlainObject("object")).toBe(false);
    expect(isPlainObject("")).toBe(false);
    expect(isPlainObject(1)).toBe(false);
    expect(isPlainObject(0)).toBe(false);
    expect(isPlainObject(NaN)).toBe(false);
    expect(isPlainObject(true)).toBe(false);
    expect(isPlainObject(false)).toBe(false);
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(new Date())).toBe(false);
    expect(isPlainObject(new Map())).toBe(false);
    expect(isPlainObject(new Set())).toBe(false);
    expect(isPlainObject(Buffer.from(""))).toBe(false);
    expect(isPlainObject(Symbol(""))).toBe(false);
    expect(isPlainObject(BigInt(1))).toBe(false);
    expect(isPlainObject(() => "")).toBe(false);
  });
});
