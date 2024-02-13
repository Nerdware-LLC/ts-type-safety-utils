/**
 * `number` type guard function.
 *
 * > 🚨 **WARNING**: This function returns `true` for type-unsafe `"number"` values like `NaN`,
 * > `Infinity`, `Number.MAX_SAFE_INTEGER + 1`, etc.
 * >
 * > Use {@link isSafeInteger|`isSafeInteger`} instead, unless you're absolutely certain you
 * > need to allow type-unsafe `"number"` values like `NaN`.
 */
export const isUnsafeNumber = (value?: unknown): value is number => {
  return typeof value === "number";
};
