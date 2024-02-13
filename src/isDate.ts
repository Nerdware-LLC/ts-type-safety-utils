/**
 * `Date` type guard function which will return `false` if the Date is invalid.
 */
export const isDate = (value?: unknown): value is Date => {
  return value instanceof Date && !isNaN(value.getTime());
};
