import { isObjectLike } from "./isObjectLike.js";

test.each(
  [
    {},
    [],
    new Map(),
    new Set(),
    new Date(),
    /x/,
    Buffer.from(""), //
  ].map((el) => [el])
)("returns true when called with %o", (input) => {
  expect(isObjectLike(input)).toBe(true);
});

test.each(
  [
    undefined,
    null,
    true,
    false,
    "",
    "object",
    1,
    0,
    NaN,
    Symbol("x"),
    BigInt(1),
    Function,
    () => "",
  ].map((el) => [el])
)("returns false when called with %o", (input) => {
  expect(isObjectLike(input)).toBe(false);
});
