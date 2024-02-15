import { getTag } from "./.internal/getTag";
import { isObjectLike } from "./isObjectLike";
import { isString } from "./isString";

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
    (isObjectLike(value) && isString((value as any)?.message) && isString((value as any)?.name))
  );
};
