import { isSymbol } from "./isSymbol.js";

test.each(
  [
    Symbol(),
    Symbol(0),
    Symbol(""), //
  ].map((el) => [el])
)("returns true when called with %o", (input) => {
  expect(isSymbol(input)).toBe(true);
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
    new Date(),
    /x/,
    Buffer.from(""),
    BigInt(1),
    () => "",
  ].map((el) => [el])
)("returns false when called with %o", (input) => {
  expect(isSymbol(input)).toBe(false);
});
