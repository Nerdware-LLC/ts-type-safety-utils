import { root } from "./.internal/root.js";

/**
 * `Buffer.isBuffer` doesn't throw if an argument is not provided, so this
 * type is used instead of `BufferConstructor["isBuffer"]` in order to
 *     1. replace `any` with `unknown`, and
 *     2. better reflect the behavior of the function.
 */
export type IsBufferWithOptionalArgument = (value?: unknown) => value is Buffer;

/** NodeJS `Buffer.isBuffer`, if available. */
const nativeIsBuffer = root?.Buffer?.isBuffer as IsBufferWithOptionalArgument | undefined;

/** no-op if `Buffer.isBuffer` is not available. */
const noOpIsBuffer = (() => false) as IsBufferWithOptionalArgument;

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
export const isBuffer: IsBufferWithOptionalArgument =
  typeof nativeIsBuffer === "function" ? nativeIsBuffer : noOpIsBuffer;
