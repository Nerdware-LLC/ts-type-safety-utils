/**
 * Gets the `toStringTag` of `value`.
 *
 * @internal
 * @param value - The value to query.
 * @returns The `toStringTag`.
 */
export const getTag = (value?: unknown): string => {
  /* The loose-equality check below (`value == null`) will return `true` for
  both `null` and `undefined`, thereby ensuring only 1 comparison is needed
  to check for both `null` and `undefined`. */

  // eslint-disable-next-line eqeqeq -- Intentional use of loose equality
  return value == null
    ? value === undefined
      ? "[object Undefined]"
      : "[object Null]"
    : Object.prototype.toString.call(value);
};
