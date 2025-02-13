import { isSafeInteger } from "./isSafeInteger.js";

test.each(
  [
    0,
    1,
    Number.MAX_SAFE_INTEGER,
    Number.MIN_SAFE_INTEGER, //
  ].map((el) => [el])
)("returns true when called with %o", (input) => {
  expect(isSafeInteger(input)).toBe(true);
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
    "number",
    1.1,
    0.1,
    NaN,
    Infinity,
    -Infinity,
    Number.NaN,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    Number.MAX_SAFE_INTEGER + 1,
    Number.MIN_SAFE_INTEGER - 1,
    Number.MAX_VALUE,
    Number.MIN_VALUE,
    Number.EPSILON,
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
  expect(isSafeInteger(input)).toBe(false);
});
