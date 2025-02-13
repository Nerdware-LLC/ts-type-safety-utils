import { isArray } from "./isArray.js";

test.each(
  [
    [],
    ["x"],
    Array(0),
    Array(1),
    Array.from(new Set()),
    Array.from({ length: 1 }), //
  ].map((el) => [el])
)("returns true when called with %o", (input) => {
  expect(isArray(input)).toBe(true);
});

test.each(
  [
    undefined,
    null,
    {},
    { length: 0 },
    { length: 1, 0: "a" },
    { length: -1 },
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
  expect(isArray(input)).toBe(false);
});
