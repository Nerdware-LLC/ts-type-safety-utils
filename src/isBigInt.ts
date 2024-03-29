/**
 * `BigInt` type guard function.
 */
export const isBigInt = (value?: unknown): value is bigint => {
  return typeof value === "bigint";
};
