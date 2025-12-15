import { getTag } from "./getTag.js";

describe("getTag", () => {
  test("returns '[object Undefined]' for undefined", () => {
    expect(getTag(undefined)).toBe("[object Undefined]");
    expect(getTag()).toBe("[object Undefined]");
  });

  test("returns '[object Null]' for null", () => {
    expect(getTag(null)).toBe("[object Null]");
  });

  test("returns correct tag for primitive types", () => {
    expect(getTag("string")).toBe("[object String]");
    expect(getTag(123)).toBe("[object Number]");
    expect(getTag(true)).toBe("[object Boolean]");
    expect(getTag(false)).toBe("[object Boolean]");
    expect(getTag(Symbol("test"))).toBe("[object Symbol]");
    expect(getTag(BigInt(123))).toBe("[object BigInt]");
  });

  test("returns correct tag for objects", () => {
    expect(getTag({})).toBe("[object Object]");
    expect(getTag([])).toBe("[object Array]");
    expect(getTag(new Date())).toBe("[object Date]");
    expect(getTag(new RegExp(""))).toBe("[object RegExp]");
    expect(getTag(new Error())).toBe("[object Error]");
    expect(getTag(() => {})).toBe("[object Function]");
    expect(getTag(new Map())).toBe("[object Map]");
    expect(getTag(new Set())).toBe("[object Set]");
  });
});
