import { isDate } from "./isDate.js";

describe("isDate", () => {
  test("returns true when called with a Date", () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date(2020, 1, 1))).toBe(true);
  });

  test("returns false when called with a non-Date argument", () => {
    expect(isDate()).toBe(false);
    expect(isDate("object")).toBe(false);
    expect(isDate("")).toBe(false);
    expect(isDate(1)).toBe(false);
    expect(isDate(0)).toBe(false);
    expect(isDate(NaN)).toBe(false);
    expect(isDate(true)).toBe(false);
    expect(isDate(false)).toBe(false);
    expect(isDate(null)).toBe(false);
    expect(isDate(undefined)).toBe(false);
    expect(isDate({})).toBe(false);
    expect(isDate([])).toBe(false);
    expect(isDate(Date.now())).toBe(false);
    expect(isDate(new Date("NOPE"))).toBe(false);
    expect(isDate(new Map())).toBe(false);
    expect(isDate(new Set())).toBe(false);
    expect(isDate(Buffer.from(""))).toBe(false);
    expect(isDate(Symbol(""))).toBe(false);
    expect(isDate(BigInt(1))).toBe(false);
    expect(isDate(() => "")).toBe(false);
  });
});
