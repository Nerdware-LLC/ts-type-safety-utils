import { isBoolean } from "./isBoolean";

describe("isBoolean", () => {
  test("returns true when called with a boolean", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(!"")).toBe(true);
    expect(isBoolean(!!"")).toBe(true);
    expect(isBoolean(Boolean())).toBe(true);
    expect(isBoolean(Boolean("foo"))).toBe(true);
  });

  test("returns false when called with a non-boolean argument", () => {
    expect(isBoolean()).toBe(false);
    expect(isBoolean("boolean")).toBe(false);
    expect(isBoolean("")).toBe(false);
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean(NaN)).toBe(false);
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean(undefined)).toBe(false);
    expect(isBoolean({})).toBe(false);
    expect(isBoolean([])).toBe(false);
    expect(isBoolean(new Date())).toBe(false);
    expect(isBoolean(new Map())).toBe(false);
    expect(isBoolean(new Set())).toBe(false);
    expect(isBoolean(Buffer.from(""))).toBe(false);
    expect(isBoolean(Symbol(""))).toBe(false);
    expect(isBoolean(BigInt(1))).toBe(false);
    expect(isBoolean(() => "")).toBe(false);
    expect(isBoolean(new Boolean())).toBe(false); // will be typeof "object"
  });
});
