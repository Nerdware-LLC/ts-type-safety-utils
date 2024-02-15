import { isBuffer } from "./isBuffer.js";

// Note: All tests occur in a Node environment, so `Buffer` is available.

describe("isBuffer", () => {
  test("returns true when called with a Buffer", () => {
    expect(isBuffer(Buffer.from("foo"))).toBe(true);
    expect(isBuffer(Buffer.from(""))).toBe(true);
  });

  test("returns false when called with a non-Buffer argument", () => {
    expect(isBuffer("object")).toBe(false);
    expect(isBuffer("")).toBe(false);
    expect(isBuffer(1)).toBe(false);
    expect(isBuffer(0)).toBe(false);
    expect(isBuffer(NaN)).toBe(false);
    expect(isBuffer(true)).toBe(false);
    expect(isBuffer(false)).toBe(false);
    expect(isBuffer(null)).toBe(false);
    expect(isBuffer(undefined)).toBe(false);
    expect(isBuffer({})).toBe(false);
    expect(isBuffer([])).toBe(false);
    expect(isBuffer(new Date())).toBe(false);
    expect(isBuffer(new Map())).toBe(false);
    expect(isBuffer(new Set())).toBe(false);
    expect(isBuffer(Symbol(""))).toBe(false);
    expect(isBuffer(BigInt(1))).toBe(false);
    expect(isBuffer(() => "")).toBe(false);
  });
});
