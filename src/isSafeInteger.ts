/**
 * `number` type guard function that only returns `true` for safe numerical integers.
 */
export const isSafeInteger = (value?: unknown): value is number => {
  return Number.isSafeInteger(value);
};
