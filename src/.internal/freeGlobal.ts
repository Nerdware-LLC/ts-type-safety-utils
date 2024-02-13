/**
 * Detect free variable `global` from NodeJS.
 * @internal
 */
export const freeGlobal =
  typeof global === "object" && global !== null && global.Object === Object && global;
