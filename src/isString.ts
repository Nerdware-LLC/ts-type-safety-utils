/**
 * `string` type guard function.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 * ```ts
 * isString('abc') // => true
 * isString('')   // => true
 * isString(1)   // => false
 * ```
 */
export const isString = (value?: unknown): value is string => {
  return typeof value === "string";
};
