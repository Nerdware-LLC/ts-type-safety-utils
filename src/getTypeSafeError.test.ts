import { getTypeSafeError } from "./getTypeSafeError.js";

// SHARED INPUTS
const INPUT_MESSAGE = "TEST_MESSAGE_INPUT";
const FALLBACK_MESSAGE = "FALLBACK_MESSAGE";
// prettier-ignore
const UNHANDLED_VALUE_TYPES = [
  null, undefined, 1, 0, NaN, true, false, {}, [], () => {}, new Set(), new Map(),
].map((el) => [el]);

test("returns an Error instance as-is when called with an Error instance", () => {
  const input = new Error(INPUT_MESSAGE);
  const result = getTypeSafeError(input);
  expect(result).toBe(input);
  expect(result).toBeInstanceOf(Error);
  expect(result.message).toBe(INPUT_MESSAGE);
});

test(`returns an Error instance with "message" set to a string provided as the first argument`, () => {
  const result = getTypeSafeError(INPUT_MESSAGE);
  expect(result).toBeInstanceOf(Error);
  expect(result.message).toBe(INPUT_MESSAGE);
});

test.each(UNHANDLED_VALUE_TYPES)(
  `returns an Error instance with the fallback message when called with %o`,
  (input) => {
    const result = getTypeSafeError(input, { fallbackErrMsg: FALLBACK_MESSAGE });
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(FALLBACK_MESSAGE);
  }
);

test(`returns the provided value as-is when it's an instance of the provided "ErrorClass"`, () => {
  class TestErrorExtensionClass extends Error {
    constructor() {
      super(INPUT_MESSAGE);
    }
  }

  const errorInstanceInput = new TestErrorExtensionClass();

  const result = getTypeSafeError(errorInstanceInput, { ErrorClass: TestErrorExtensionClass });

  expect(result).toBe(errorInstanceInput);
  expect(result).toBeInstanceOf(TestErrorExtensionClass);
  expect(result.message).toBe(INPUT_MESSAGE);
});

test.each(UNHANDLED_VALUE_TYPES)(
  `returns an instance of the provided "ErrorClass" when called with %o`,
  (input) => {
    class TestErrorExtensionClass extends Error {
      constructor() {
        super(INPUT_MESSAGE);
      }
    }

    const result = getTypeSafeError(input, { ErrorClass: TestErrorExtensionClass });
    expect(result).toBeInstanceOf(TestErrorExtensionClass);
    expect(result.message).toBe(INPUT_MESSAGE);
  }
);

test(`returns an Error instance with all enumerable own-properties of an object argument`, () => {
  const input = { customOwnProp: "test" };
  const result = getTypeSafeError(input, { fallbackErrMsg: FALLBACK_MESSAGE });
  expect(result).toBeInstanceOf(Error);
  expect(result.message).toBe(FALLBACK_MESSAGE);
  expect(result.customOwnProp).toBe(input.customOwnProp);
});

test(`returns an Error instance with a "message" set to "value.message" when the latter is a string`, () => {
  const input = { message: INPUT_MESSAGE };
  const result = getTypeSafeError(input, { shouldStringifyUnknownError: true });
  expect(result).toBeInstanceOf(Error);
  expect(result.message).toBe(INPUT_MESSAGE);
});

test(`returns an Error instance with a "message" that includes the stringified input when "input.message" is not a string`, () => {
  const NOT_A_STRING = 123;
  const input = { message: NOT_A_STRING };
  const result = getTypeSafeError(input, { shouldStringifyUnknownError: true });
  expect(result).toBeInstanceOf(Error);
  expect(result.message).toContain(JSON.stringify(input));
});

test.each(UNHANDLED_VALUE_TYPES)(
  `returns an Error instance with a "message" that includes the stringified input when called with %o`,
  (input) => {
    const result = getTypeSafeError(input, { shouldStringifyUnknownError: true });
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toContain(JSON.stringify(input));
  }
);
