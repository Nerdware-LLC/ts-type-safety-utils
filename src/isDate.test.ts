import { isDate } from "./isDate.js";

test.each(
  [
    new Date(),
    new Date(2020, 1, 1), //
  ].map((el) => [el])
)("returns true when called with %o", (input) => {
  expect(isDate(input)).toBe(true);
});

test.each(
  [
    undefined,
    null,
    {},
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
    new Date("NOPE"),
    /x/,
    Buffer.from(""),
    Symbol("x"),
    BigInt(1),
    () => "",
  ].map((el) => [el])
)("returns false when called with %o", (input) => {
  expect(isDate(input)).toBe(false);
});
