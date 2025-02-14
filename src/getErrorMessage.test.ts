import { getErrorMessage } from "./getErrorMessage.js";

// SHARED INPUTS
const INPUT_MESSAGE = "TEST_MESSAGE_INPUT";

test("returns a string argument as-is", () => {
  expect(getErrorMessage(INPUT_MESSAGE)).toBe(INPUT_MESSAGE);
});

test(`returns the "message" property of an Error-like object`, () => {
  expect(getErrorMessage(new Error(INPUT_MESSAGE))).toBe(INPUT_MESSAGE);
  expect(getErrorMessage({ message: INPUT_MESSAGE })).toBe(INPUT_MESSAGE);
});

test.each(
  [
    null,
    undefined,
    1,
    0,
    NaN,
    true,
    false,
    {},
    [],
    new Set(),
    new Map(),
    () => {}, //
  ].map((el) => [el])
)("returns undefined when called with %o", (input) => {
  expect(getErrorMessage(input)).toBeUndefined();
});
