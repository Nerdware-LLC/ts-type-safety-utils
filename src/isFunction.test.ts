import { isFunction } from "./isFunction.js";

describe("isFunction", () => {
  test("returns true when called with a function", () => {
    expect(isFunction(function () {})).toBe(true);
    expect(isFunction(() => {})).toBe(true);
  });

  test("returns false when called with a non-function argument", () => {
    expect(isFunction()).toBe(false);
    expect(isFunction("function")).toBe(false);
    expect(isFunction("")).toBe(false);
    expect(isFunction(1)).toBe(false);
    expect(isFunction(0)).toBe(false);
    expect(isFunction(NaN)).toBe(false);
    expect(isFunction(true)).toBe(false);
    expect(isFunction(false)).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction({})).toBe(false);
    expect(isFunction([])).toBe(false);
    expect(isFunction(new Date())).toBe(false);
    expect(isFunction(new Map())).toBe(false);
    expect(isFunction(new Set())).toBe(false);
    expect(isFunction(Buffer.from(""))).toBe(false);
    expect(isFunction(Symbol(""))).toBe(false);
    expect(isFunction(BigInt(1))).toBe(false);
  });
});
