/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 * ```ts
 * isObjectLike({}) // => true
 * isObjectLike([1, 2, 3]) // => true
 * isObjectLike(Function) // => false
 * isObjectLike(null) // => false
 * ```
 */
export const isObjectLike = (value?: unknown): value is object => {
  return typeof value === "object" && value !== null;
};
