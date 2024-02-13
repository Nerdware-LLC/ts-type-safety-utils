/**
 * `Array` type guard function.
 *
 * In cases where it is _not_ known whether `value` is an array, but the type of its elements
 * _is known IF `value` IS an array_, a type parameter can be provided which is applied if
 * `Array.isArray(value)` returns `true`.
 *
 * Examples:
 * ```ts
 * isArray(foo) //         foo is unknown[]
 * isArray<string>(foo) // foo is string[]
 * ```
 */
export const isArray: <T>(value?: unknown) => value is Array<T> | ReadonlyArray<T> = Array.isArray;
