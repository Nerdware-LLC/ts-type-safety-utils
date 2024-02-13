import { isString } from "./isString";
import { safeJsonStringify } from "./safeJsonStringify";
import type { Class } from "type-fest";

/**
 * type-safety util which guarantees the returned object is an `Error`.
 */
export const getTypeSafeError = (
  err: unknown,
  {
    ErrorClass,
    fallBackErrMsg,
  }: {
    ErrorClass?: Class<Error>;
    fallBackErrMsg?: string;
  } = {}
): Error => {
  if (err instanceof Error) return err;

  ErrorClass ??= Error;
  fallBackErrMsg ||= "An unknown error occurred.";

  return new ErrorClass(
    !err
      ? fallBackErrMsg
      : isString(err)
        ? err
        : isString((err as any)?.message)
          ? (err as { message: string }).message
          : `${fallBackErrMsg}\nOriginal error payload: ${safeJsonStringify(err)}`
  );
};

/**
 * Attempts to parse an error message from an unknown error.
 */
export const getErrorMessage = (err: any): string | undefined => {
  return isString(err) ? err : isString(err?.message) ? (err.message as string) : undefined;
};
