import { root, NO_OP } from "./.internal";

/** NodeJS `Buffer.isBuffer`, if available. */
const nativeIsBuffer = root?.Buffer?.isBuffer as BufferConstructor["isBuffer"] | undefined;

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
export const isBuffer =
  typeof nativeIsBuffer === "function"
    ? nativeIsBuffer
    : (NO_OP as unknown as BufferConstructor["isBuffer"]);
