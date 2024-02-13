/**
 * `function` type guard function.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (value?: unknown): value is Function => {
  return typeof value === "function";
};
