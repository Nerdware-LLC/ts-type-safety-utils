import { isString } from "./isString.js";

test.each(
  [
    "foo",
    String(), //
  ].map((el) => [el])
)("returns true when called with %o", (input) => {
  expect(isString(input)).toBe(true);
});

test.each(
  [
    undefined,
    null,
    {},
    [],
    true,
    false,
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
  expect(isString(input)).toBe(false);
});
