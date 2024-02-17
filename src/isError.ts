import { getTag } from "./.internal/getTag.js";
import { isObjectLike } from "./isObjectLike.js";
import { isString } from "./isString.js";

/**
 * `Error` type guard function which checks if `value` is an `Error`, `EvalError`, `RangeError`,
 * `ReferenceError`, `SyntaxError`, `TypeError`, or `URIError` object.
 */
export const isError = <ErrType extends Error = Error>(value?: unknown): value is ErrType => {
  if (!isObjectLike(value)) return false;

  const tag = getTag(value);

  return (
    tag === "[object Error]" ||
    tag === "[object DOMException]" ||
    (isString((value as { message?: string }).message) &&
      isString((value as { name?: string }).name))
  );
};
