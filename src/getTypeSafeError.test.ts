import { getTypeSafeError, getErrorMessage } from "./getTypeSafeError.js";

// SHARED INPUTS
const inputMessage = "TEST_MESSAGE_INPUT";
const fallbackErrMsg = "FALLBACK_MESSAGE";
// prettier-ignore
const UNHANDLED_VALUE_TYPES = [
  null, undefined, 1, 0, NaN, true, false, {}, [], () => {}, new Set(), new Map(),
].map((el) => [el]);

describe("getTypeSafeError()", () => {
  test("returns an Error instance as-is when called with an Error instance", () => {
    const input = new Error(inputMessage);
    const result = getTypeSafeError(input);
    expect(result).toBe(input);
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(inputMessage);
  });

  test(`returns an Error instance with "message" set to a string provided as the first argument`, () => {
    const result = getTypeSafeError(inputMessage);
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(inputMessage);
  });

  test.each(UNHANDLED_VALUE_TYPES)(
    `returns an Error instance with the fallback message when called with %o`,
    (input) => {
      const result = getTypeSafeError(input, { fallbackErrMsg });
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe(fallbackErrMsg);
    }
  );

  test.each(UNHANDLED_VALUE_TYPES)(
    `returns an instance of the provided "ErrorClass" when called with %o`,
    (input) => {
      class TestErrorExtensionClass extends Error {
        constructor() {
          super(inputMessage);
        }
      }

      const result = getTypeSafeError(input, { ErrorClass: TestErrorExtensionClass });
      expect(result).toBeInstanceOf(TestErrorExtensionClass);
      expect(result.message).toBe(inputMessage);
    }
  );

  test(`returns the provided value as-is when it's an instance of the provided "ErrorClass"`, () => {
    class TestErrorExtensionClass extends Error {
      constructor() {
        super(inputMessage);
      }
    }

    const errorInstanceInput = new TestErrorExtensionClass();

    const result = getTypeSafeError(errorInstanceInput, { ErrorClass: TestErrorExtensionClass });

    expect(result).toBe(errorInstanceInput);
    expect(result).toBeInstanceOf(TestErrorExtensionClass);
    expect(result.message).toBe(inputMessage);
  });

  test.each(UNHANDLED_VALUE_TYPES)(
    `returns an Error instance with a "message" that includes the stringified input when called with %o`,
    (input) => {
      const result = getTypeSafeError(input, { shouldStringifyUnknownError: true });
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toContain(JSON.stringify(input));
    }
  );

  test(`returns an Error instance with all enumerable own-properties of an object argument`, () => {
    const input = { customOwnProp: "test" };
    const result = getTypeSafeError(input, { fallbackErrMsg }) as Error & typeof input;
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(fallbackErrMsg);
    expect(result.customOwnProp).toBe(input.customOwnProp);
  });
});

describe("getErrorMessage()", () => {
  test("returns a string argument as-is", () => {
    expect(getErrorMessage(inputMessage)).toBe(inputMessage);
  });

  test(`returns the "message" property of an Error-like object`, () => {
    expect(getErrorMessage(new Error(inputMessage))).toBe(inputMessage);
    expect(getErrorMessage({ message: "test" })).toBe("test");
  });

  test.each(UNHANDLED_VALUE_TYPES)("returns undefined when called with %o", (input) => {
    expect(getErrorMessage(input)).toBeUndefined();
  });
});
