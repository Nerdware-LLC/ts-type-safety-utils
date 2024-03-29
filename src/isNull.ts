/**
 * `null` type guard function.
 */
export const isNull = (value?: unknown): value is null => {
  return value === null;
};
