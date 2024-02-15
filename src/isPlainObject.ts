import { getTag } from "./.internal/getTag";

/**
 * `Object` type guard function which tests if `value` is a plain JS object (e.g. `{ foo: "bar" }`)
 * by checking if value's `toString` result is `"[object Object]"`.
 */
export const isPlainObject = <KeyTypes extends PropertyKey = string>(
  value?: unknown
): value is Record<KeyTypes, unknown> => {
  return getTag(value) === "[object Object]";
};
