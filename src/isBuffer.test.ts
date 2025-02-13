import { isBuffer } from "./isBuffer.js";

// Note: All tests occur in a Node environment, so `Buffer` is available by default.

test.each(
  [
    Buffer.from("foo"),
    Buffer.from(""), //
  ].map((el) => [el])
)("returns true when called with %o in a node env", (input) => {
  expect(isBuffer(input)).toBe(true);
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
    Symbol("x"),
    BigInt(1),
    () => "",
  ].map((el) => [el])
)("returns false when called with %o", (input) => {
  expect(isBuffer(input)).toBe(false);
});

test("is a no-op when Buffer.isBuffer is not available", async () => {
  // Reset the module cache to ensure the next import of `isBuffer` will use the mocked `root` object.
  vi.resetModules();
  vi.doMock("./.internal/root.js", () => ({ root: {} }));

  const { isBuffer: noOpIsBuffer } = await import("./isBuffer.js");

  expect(noOpIsBuffer(Buffer.from("foo"))).toBe(false);
});
