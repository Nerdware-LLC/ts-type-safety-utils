import { isNull } from "./isNull.js";

test("returns true when called with null", () => {
  expect(isNull(null)).toBe(true);
});

test.each(
  [
    undefined,
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
    new Date(),
    /x/,
    Buffer.from(""),
    Symbol("x"),
    BigInt(1),
    () => "",
  ].map((el) => [el])
)("returns false when called with %o", (input) => {
  expect(isNull(input)).toBe(false);
});
