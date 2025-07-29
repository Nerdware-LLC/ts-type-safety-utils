import { freeGlobal } from "./freeGlobal.js";

// Detect free variable `globalThis`:
const freeGlobalThis =
  typeof globalThis === "object"
  && globalThis !== null // eslint-disable-line @typescript-eslint/no-unnecessary-condition
  && globalThis.Object === Object
  && globalThis;

// Detect free variable `self`:
const freeSelf =
  typeof self === "object"
  && self !== null // eslint-disable-line @typescript-eslint/no-unnecessary-condition
  && self.Object === Object
  && self;

/**
 * Used as a reference to the global object.
 * @internal
 */
export const root =
  freeGlobalThis // prettier-ignore
  || freeGlobal
  || freeSelf
  || (Function("return this")() as Partial<typeof globalThis>); // eslint-disable-line @typescript-eslint/no-implied-eval,@typescript-eslint/no-unsafe-call
