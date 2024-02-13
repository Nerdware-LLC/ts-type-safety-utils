/**
 * `Symbol` type guard function.
 */
export const isSymbol = (value?: unknown): value is symbol => {
  return typeof value === "symbol";
};
