import { freeGlobal } from "./freeGlobal";

// Detect free variable `globalThis`:
const freeGlobalThis =
  typeof globalThis === "object" &&
  globalThis !== null &&
  globalThis.Object === Object &&
  globalThis;

// Detect free variable `self`:
const freeSelf = typeof self === "object" && self !== null && self.Object === Object && self;

/**
 * Used as a reference to the global object.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-implied-eval
export const root = freeGlobalThis || freeGlobal || freeSelf || Function("return this")();
