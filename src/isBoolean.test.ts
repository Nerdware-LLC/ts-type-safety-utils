import { isBoolean } from "./isBoolean.js";

test.each(
  [
    true,
    false,
    Boolean(),
    Boolean("foo"), //
  ].map((el) => [el])
)("returns true when called with a boolean", () => {
  expect(isBoolean(true)).toBe(true);
  expect(isBoolean(false)).toBe(true);
  expect(isBoolean(Boolean())).toBe(true);
  expect(isBoolean(Boolean("foo"))).toBe(true);
});

test.each(
  [
    undefined,
    null,
    {},
    [],
    "",
    "boolean",
    1,
    0,
    NaN,
    new Map(),
    new Set(),
    new Date(),
    new Boolean(), // will be typeof "object"
    /x/,
    Buffer.from(""),
    Symbol("x"),
    BigInt(1),
    () => "",
  ].map((el) => [el])
)("returns false when called with %o", (input) => {
  expect(isBoolean(input)).toBe(false);
});
