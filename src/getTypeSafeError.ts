import { isObjectLike } from "./isObjectLike.js";
import { isString } from "./isString.js";
import { safeJsonStringify } from "./safeJsonStringify.js";
import type { Class } from "type-fest";

/**
 * Type-safety util function which uses the provided `value` to return an instance
 * of the provided `ErrorClass` (default: {@link Error}). To facilitate additional
 * processing of the returned Error, its type is augmented with an index signature
 * to allow for arbitrary properties of type `unknown`.
 *
 * @template ErrorClassType - A class with a constructor that returns an Error.
 * The first argument of the constructor must be a `string` to be compatible with
 * the default `Error` constructor.
 */
export const getTypeSafeError = <ErrorClassType extends Class<Error, [string]>>(
  value: unknown,
  {
    ErrorClass = Error as unknown as ErrorClassType,
    fallbackErrMsg = "An unknown error occurred.",
    shouldStringifyUnknownError = false,
  }: {
    ErrorClass?: ErrorClassType;
    fallbackErrMsg?: string;
    shouldStringifyUnknownError?: boolean;
  } = {}
): InstanceType<ErrorClassType> & Record<PropertyKey, unknown> => {
  // Type of the returned Error augmented with an index signature
  type ReturnedError = InstanceType<ErrorClassType> & Record<PropertyKey, unknown>;

  // If `value` is already an instance of `ErrorClass`, return it as-is
  if (value instanceof ErrorClass) return value as ReturnedError;

  // If `value` is a string, use it as the error message
  if (isString(value)) return new ErrorClass(value) as ReturnedError;

  // If `value` is none of the above, initialize a new Error with the fallback error message
  const returnedError = new ErrorClass(fallbackErrMsg);

  // If `value` is object-like, copy over all own-properties
  if (isObjectLike(value)) {
    // Object.assign only copies enumerable props, and Error.prototype.message is not enumerable
    Object.defineProperties(returnedError, Object.getOwnPropertyDescriptors(value));

    // If `value.message` is a string, return the new error here
    if (isString((value as { message?: string }).message)) {
      return returnedError as ReturnedError;
    }
  }

  /* At this point, the value-type is deemed "unhandled" — if configured to
  do so, stringify the unknown value and append it to the error message. */
  if (shouldStringifyUnknownError)
    returnedError.message += `\nOriginal error: ${safeJsonStringify(value)}`;

  return returnedError as ReturnedError;
};
