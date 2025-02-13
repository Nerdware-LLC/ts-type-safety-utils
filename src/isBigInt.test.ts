import { isBigInt } from "./isBigInt.js";

test.each(
  [
    BigInt(0),
    BigInt(1), //
  ].map((el) => [el])
)("returns true when called with %o", (input) => {
  expect(isBigInt(input)).toBe(true);
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
    "bigint",
    1,
    0,
    NaN,
    new Map(),
    new Set(),
    new Date(),
    /x/,
    Buffer.from(""),
    Symbol("x"),
    () => "",
  ].map((el) => [el])
)("returns false when called with %o", (input) => {
  expect(isBigInt(input)).toBe(false);
});
