/**
 * This no-op function does nothing and always returns `false` — it's used as a
 * stand-in for global objects that are not available in the execution environment
 * (e.g., for `Buffer.isBuffer` in browsers).
 *
 * @internal
 */
export const NO_OP = () => false;
