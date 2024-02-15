import { isSymbol } from "./isSymbol.js";

describe("isSymbol", () => {
  test("returns true when called with a Symbol", () => {
    expect(isSymbol(Symbol())).toBe(true);
    expect(isSymbol(Symbol(0))).toBe(true);
    expect(isSymbol(Symbol(""))).toBe(true);
  });

  test("returns false when called with a non-Symbol argument", () => {
    expect(isSymbol()).toBe(false);
    expect(isSymbol("symbol")).toBe(false);
    expect(isSymbol("")).toBe(false);
    expect(isSymbol(1)).toBe(false);
    expect(isSymbol(0)).toBe(false);
    expect(isSymbol(NaN)).toBe(false);
    expect(isSymbol(true)).toBe(false);
    expect(isSymbol(false)).toBe(false);
    expect(isSymbol(null)).toBe(false);
    expect(isSymbol(undefined)).toBe(false);
    expect(isSymbol({})).toBe(false);
    expect(isSymbol([])).toBe(false);
    expect(isSymbol(new Date())).toBe(false);
    expect(isSymbol(new Map())).toBe(false);
    expect(isSymbol(new Set())).toBe(false);
    expect(isSymbol(Buffer.from(""))).toBe(false);
    expect(isSymbol(BigInt(1))).toBe(false);
    expect(isSymbol(() => "")).toBe(false);
  });
});
