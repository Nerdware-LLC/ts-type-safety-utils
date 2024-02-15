import { isBigInt } from "./isBigInt";

describe("isBigInt", () => {
  test("returns true when called with a BigInt", () => {
    expect(isBigInt(BigInt(1))).toBe(true);
    expect(isBigInt(BigInt(0))).toBe(true);
  });

  test("returns false when called with a non-BigInt argument", () => {
    expect(isBigInt()).toBe(false);
    expect(isBigInt("bigint")).toBe(false);
    expect(isBigInt("")).toBe(false);
    expect(isBigInt(1)).toBe(false);
    expect(isBigInt(0)).toBe(false);
    expect(isBigInt(NaN)).toBe(false);
    expect(isBigInt(true)).toBe(false);
    expect(isBigInt(false)).toBe(false);
    expect(isBigInt(null)).toBe(false);
    expect(isBigInt(undefined)).toBe(false);
    expect(isBigInt({})).toBe(false);
    expect(isBigInt([])).toBe(false);
    expect(isBigInt(new Date())).toBe(false);
    expect(isBigInt(new Map())).toBe(false);
    expect(isBigInt(new Set())).toBe(false);
    expect(isBigInt(Buffer.from(""))).toBe(false);
    expect(isBigInt(Symbol(""))).toBe(false);
    expect(isBigInt(() => "")).toBe(false);
  });
});
