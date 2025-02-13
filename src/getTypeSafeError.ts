import { isObjectLike } from "./isObjectLike.js";
import { isString } from "./isString.js";
import { safeJsonStringify } from "./safeJsonStringify.js";
import type { Class } from "type-fest";

/**
 * type-safety util which uses the provided `value` to return an instance of
 * the provided `ErrorClass` (default: {@link Error|`Error`}).
 */
export const getTypeSafeError = <ErrType extends Class<Error, Parameters<ErrorConstructor>>>(
  value: unknown,
  {
    ErrorClass = Error as unknown as ErrType,
    fallbackErrMsg = "An unknown error occurred.",
    shouldStringifyUnknownError = false,
  }: {
    ErrorClass?: ErrType;
    fallbackErrMsg?: string;
    shouldStringifyUnknownError?: boolean;
  } = {}
): InstanceType<ErrType> => {
  // If `value` is already an instance of `ErrorClass`, return it as-is
  if (value instanceof ErrorClass) return value as InstanceType<ErrType>;

  // If `value` is a string, use it as the error message
  if (isString(value)) return new ErrorClass(value) as InstanceType<ErrType>;

  // If `value` is none of the above, initialize a new Error with the fallback error message
  let returnedError = new ErrorClass(fallbackErrMsg);

  // If `value` is object-like, copy over any enumerable own-properties (may include "message")
  if (isObjectLike(value)) {
    returnedError = Object.assign(returnedError, value);

    // If `value.message` is a string, return the new error here
    if (isString((value as { message?: string }).message)) {
      return returnedError as InstanceType<ErrType>;
    }
  }

  /* At this point, the value-type is deemed "unhandled" — if configured to
  do so, stringify the unknown value and append it to the error message. */
  if (shouldStringifyUnknownError)
    returnedError.message += `\nOriginal error: ${safeJsonStringify(value)}`;

  return returnedError as InstanceType<ErrType>;
};

/**
 * Attempts to parse an error message from an unknown error.
 */
export const getErrorMessage = (value: unknown): string | undefined => {
  return isString(value)
    ? value
    : isObjectLike(value) && isString((value as { message?: string }).message)
      ? (value as { message: string }).message
      : undefined;
};
