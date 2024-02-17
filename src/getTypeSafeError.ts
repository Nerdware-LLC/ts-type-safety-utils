import { isObjectLike } from "./isObjectLike.js";
import { isString } from "./isString.js";
import { safeJsonStringify } from "./safeJsonStringify.js";
import type { Class } from "type-fest";

/**
 * type-safety util which guarantees the returned object is an instance of the
 * provided `ErrorClass` (default: {@link Error|`Error`}).
 */
export const getTypeSafeError = <E extends Class<Error>>(
  err: unknown,
  {
    ErrorClass,
    fallBackErrMsg,
    shouldStringifyUnknownError,
  }: {
    ErrorClass?: E;
    fallBackErrMsg?: string;
    shouldStringifyUnknownError?: boolean;
  } = {}
): InstanceType<E> => {
  // Set default ErrorClass to `Error`
  ErrorClass ??= Error as unknown as E;

  if (err instanceof ErrorClass) return err as InstanceType<E>;

  // For the err msg, try `err` and `err?.message`
  let errorMessage = getErrorMessage(err);

  // If it's falsey, use the fallback error message
  if (!errorMessage) {
    errorMessage = fallBackErrMsg || "An unknown error occurred.";

    // If configured to do so, stringify the unknown error and append it to the error message
    if (shouldStringifyUnknownError) {
      errorMessage += `\nOriginal error payload: ${safeJsonStringify(err)}`;
    }
  }

  return new ErrorClass(errorMessage) as InstanceType<E>;
};

/**
 * Attempts to parse an error message from an unknown error.
 */
export const getErrorMessage = (err: unknown): string | undefined => {
  return isString(err)
    ? err
    : isObjectLike(err) && isString((err as { message?: string }).message)
      ? (err as { message: string }).message
      : undefined;
};
