import { getTypeSafeError } from "./getTypeSafeError.js";

// ARRANGE SHARED MOCK INPUTS:

const INPUT_MESSAGE = "TEST_MESSAGE_INPUT";
const FALLBACK_MESSAGE = "FALLBACK_MESSAGE";

// prettier-ignore
const UNHANDLED_VALUE_TYPES = [
  null, undefined, 1, 0, NaN, true, false, {}, [], () => {}, new Set(), new Map(),
].map((el) => [el]);

class TestErrorExtensionClass extends Error {
  override readonly name = "TestErrorExtensionClass"; // <-- Ensure the name is set for testing
}

test("returns an Error instance as-is when called with an Error instance", () => {
  const errorInstanceInput = new Error(INPUT_MESSAGE);
  const result = getTypeSafeError(errorInstanceInput);
  expect(result).toBe(errorInstanceInput);
  expect(result).toBeInstanceOf(Error);
  expect(result.name).toBe(Error.name);
  expect(result.message).toBe(INPUT_MESSAGE);
});

test(`returns an Error instance with "message" set to a string provided as the first argument`, () => {
  const result = getTypeSafeError(INPUT_MESSAGE);
  expect(result).toBeInstanceOf(Error);
  expect(result.message).toBe(INPUT_MESSAGE);
});

test(`returns the provided value as-is when it's an instance of the provided "ErrorClass"`, () => {
  const errorInstanceInput = new TestErrorExtensionClass(INPUT_MESSAGE);
  const result = getTypeSafeError(errorInstanceInput, { ErrorClass: TestErrorExtensionClass });
  expect(result).toBe(errorInstanceInput);
  expect(result).toBeInstanceOf(TestErrorExtensionClass);
  expect(result.name).toBe(TestErrorExtensionClass.name);
  expect(result.message).toBe(INPUT_MESSAGE);
});

test(`returns an instance of the "ErrorClass" even when called with an Error instance`, () => {
  class TestErrorExtensionClass extends Error {}

  const baseErrorInstance = new Error("Foo error message");

  const result = getTypeSafeError(baseErrorInstance, { ErrorClass: TestErrorExtensionClass });

  expect(result).toBeInstanceOf(TestErrorExtensionClass);
  expect(result.name).toBe(TestErrorExtensionClass.name);
  expect(result.message).toBe(baseErrorInstance.message);
});

test(`preserves all own-properties of the provided value when it is an Error instance`, () => {
  class TestErrorExtensionClass extends Error {
    fooCustomProp = "bar";
  }

  const baseErrorInstance = new Error("Foo error message");

  const result = getTypeSafeError(baseErrorInstance, { ErrorClass: TestErrorExtensionClass });

  expect(result).toBeInstanceOf(TestErrorExtensionClass);
  expect(result.name).toBe(TestErrorExtensionClass.name);
  expect(result.message).toBe(baseErrorInstance.message);
  expect(result.fooCustomProp).toBe("bar");
});

test(`preserves all own-properties of the provided value when it is object-like`, () => {
  class TestErrorExtensionClass extends Error {
    foo = "class-provided-foo"; //         <-- Should be overridden by the object-like value
    uniqueProp = "class-provided-uniqueProp"; // <-- Not overridden by the object-like value
  }

  const objectValue = {
    message: "Object-like error message",
    foo: "custom-foo", // <-- Should override the class property
    bar: "custom-bar", // <-- Should be added to the result
  };

  const arrayObject: Array<unknown> = [];
  Object.defineProperties(arrayObject, Object.getOwnPropertyDescriptors(objectValue));

  // Arrange an array of object-like values to test
  [
    objectValue, //
    arrayObject,
  ].forEach((objectLikeValue) => {
    // Act
    const result = getTypeSafeError(objectLikeValue, { ErrorClass: TestErrorExtensionClass });
    // Assert
    expect(result).toBeInstanceOf(TestErrorExtensionClass);
    expect(result.name).toBe(TestErrorExtensionClass.name);
    expect(result.message).toBe(objectValue.message);
    expect(result.foo).toBe("custom-foo");
    expect(result.bar).toBe("custom-bar");
    expect(result.uniqueProp).toBe("class-provided-uniqueProp");
  });
});

test(`preserves all own-properties of object-like values except "name" when "shouldPreserveName" is true`, () => {
  class TestErrorExtensionClass extends Error {
    fooCustomProp = "bar";
  }

  const baseErrorInstance = new Error("Foo error message");

  // Act
  const result = getTypeSafeError(baseErrorInstance, {
    ErrorClass: TestErrorExtensionClass,
    shouldPreserveName: true,
  });

  // Assert
  expect(result).toBeInstanceOf(TestErrorExtensionClass);
  expect(result.name).toBe(baseErrorInstance.name); // <-- "Error"
  expect(result.message).toBe(baseErrorInstance.message);
  expect(result.fooCustomProp).toBe("bar");
});

test(`returns an Error instance with all enumerable own-properties of an object argument`, () => {
  const input = { customOwnProp: "test" };
  const result = getTypeSafeError(input, { fallbackErrMsg: FALLBACK_MESSAGE });
  expect(result).toBeInstanceOf(Error);
  expect(result.name).toBe(Error.name);
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
  `returns an instance of the provided "ErrorClass" when called with %o`,
  (unhandledInputType) => {
    const result = getTypeSafeError(unhandledInputType, { ErrorClass: TestErrorExtensionClass });
    expect(result).toBeInstanceOf(TestErrorExtensionClass);
    expect(result.name).toBe(TestErrorExtensionClass.name);
  }
);

test.each(UNHANDLED_VALUE_TYPES)(
  `returns an Error instance with the fallback message when called with %o`,
  (unhandledInputType) => {
    const result = getTypeSafeError(unhandledInputType, { fallbackErrMsg: FALLBACK_MESSAGE });
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(FALLBACK_MESSAGE);
  }
);

test.each(UNHANDLED_VALUE_TYPES)(
  `returns an Error instance with a "message" that includes the stringified input when called with %o`,
  (unhandledInputType) => {
    const result = getTypeSafeError(unhandledInputType, { shouldStringifyUnknownError: true });
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toContain(JSON.stringify(unhandledInputType));
  }
);
