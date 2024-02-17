import { root } from "./.internal/root.js";

/** NodeJS `Buffer.isBuffer`, if available. */
// eslint-disable-next-line @typescript-eslint/unbound-method
const nativeIsBuffer = root.Buffer?.isBuffer;

/** no-op if `Buffer.isBuffer` is not available. */
const noOpIsBuffer = () => false as const;

/**
 * Checks if `value` is a buffer.
 *
 * > In non-node environments, this function is a no-op and will always return `false`.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 * ```ts
 * isBuffer(Buffer.alloc(2)) // => true
 * isBuffer(new Uint8Array(2)) // => false
 * ```
 */
export const isBuffer = (typeof nativeIsBuffer === "function"
  ? nativeIsBuffer
  : noOpIsBuffer) as unknown as (value?: unknown) => value is Buffer;
