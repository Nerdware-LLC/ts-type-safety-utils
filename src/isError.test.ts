import { isError } from "./isError.js";

describe("isError", () => {
  test("returns true when the input is an object with a tag of '[object Error]'", () => {
    expect(isError(new Error())).toBe(true);
    expect(isError(new EvalError())).toBe(true);
    expect(isError(new RangeError())).toBe(true);
    expect(isError(new ReferenceError())).toBe(true);
    expect(isError(new SyntaxError())).toBe(true);
    expect(isError(new TypeError())).toBe(true);
    expect(isError(new URIError())).toBe(true);
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
});
