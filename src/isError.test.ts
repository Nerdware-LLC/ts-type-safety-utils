import { isError } from "./isError.js";

test.each(
  [
    new Error(),
    new EvalError(),
    new RangeError(),
    new ReferenceError(),
    new SyntaxError(),
    new TypeError(),
    new URIError(),
  ].map((el) => [el])
)("returns true when called with a %o", (input) => {
  expect(isError(input)).toBe(true);
});

test("returns true when the input is an object with a 'message' and 'name' property, and is not a plain object", () => {
  expect(isError({ message: "Error message", name: "Error" })).toBe(true);
});

test("returns false when the input is not an object", () => {
  expect(isError("error")).toBe(false);
});

test("returns false when the input is an object without a 'message' or 'name' property", () => {
  expect(isError({ description: "Error description" })).toBe(false);
});

test("returns false when the input is an object with a 'message' or 'name' property that is not a string", () => {
  expect(isError({ message: 123, name: true })).toBe(false);
});
