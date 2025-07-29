/**
 * Detect free variable `global` from NodeJS.
 * @internal
 */
export const freeGlobal: typeof globalThis | false =
  typeof global === "object"
  && global !== null // eslint-disable-line @typescript-eslint/no-unnecessary-condition
  && global.Object === Object
  && global;
