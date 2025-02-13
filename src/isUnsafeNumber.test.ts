import { isUnsafeNumber } from "./isUnsafeNumber.js";

test.each(
  [
    1,
    0,
    0.1,
    NaN,
    Number.NaN,
    Infinity,
    -Infinity,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    Number.MAX_SAFE_INTEGER + 1,
    Number.MIN_SAFE_INTEGER - 1,
    Number.MAX_VALUE,
    Number.MIN_VALUE,
    Number.EPSILON,
  ].map((el) => [el])
)(`returns true when called with %o`, (input) => {
  expect(isUnsafeNumber(input)).toBe(true);
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
    new Map(),
    new Set(),
    new Date(),
    /x/,
    Buffer.from(""),
    Symbol("x"),
    BigInt(1),
    () => "",
  ].map((el) => [el])
)(`returns false when called with %o`, (input) => {
  expect(isUnsafeNumber(input)).toBe(false);
});
