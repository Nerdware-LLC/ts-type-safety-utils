/**
 * `string` type guard function.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 * ```ts
 * isString('abc') // => true
 * isString(1) // => false
 * ```
 */
export const isString = (arg?: unknown): arg is string => {
  return typeof arg === "string";
};
