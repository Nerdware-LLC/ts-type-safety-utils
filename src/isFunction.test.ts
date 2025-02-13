import { isFunction } from "./isFunction.js";

test("returns true when called with a function", () => {
  expect(isFunction(function () {})).toBe(true);
  expect(isFunction(() => {})).toBe(true);
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
    "function",
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
  ].map((el) => [el])
)("returns false when called with %o", (input) => {
  expect(isFunction(input)).toBe(false);
});
