import { isUndefined } from "./isUndefined.js";

test("returns true when called with undefined", () => {
  expect(isUndefined(undefined)).toBe(true);
  expect(isUndefined()).toBe(true);
});

test.each(
  [
    null,
    {},
    [],
    true,
    false,
    "",
    "undefined",
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
  expect(isUndefined(input)).toBe(false);
});
