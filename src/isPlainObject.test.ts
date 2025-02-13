import { isPlainObject } from "./isPlainObject.js";

test("returns true when called with a record-like object", () => {
  expect(isPlainObject({})).toBe(true);
  expect(isPlainObject(Object.create(null))).toBe(true);
});

test.each(
  [
    undefined,
    null,
    [],
    true,
    false,
    "",
    "object",
    1,
    0,
    NaN,
    new Map(),
    new Set(),
    new Date(),
    /x/,
    Buffer.from(""),
    Symbol("x"),
    BigInt(1),
    () => "",
  ].map((el) => [el])
)("returns false when called with %o", (input) => {
  expect(isPlainObject(input)).toBe(false);
});
