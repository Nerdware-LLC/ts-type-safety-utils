import { isObjectLike } from "./isObjectLike.js";
import { isString } from "./isString.js";

/**
 * Attempts to parse an error message from the provided `value`.
 */
export const getErrorMessage = (value: unknown): string | undefined => {
  return isString(value)
    ? value
    : isObjectLike(value) && isString((value as { message?: string }).message)
      ? (value as { message: string }).message
      : undefined;
};
