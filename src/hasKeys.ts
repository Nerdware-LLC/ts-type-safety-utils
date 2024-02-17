/**
 * A type-guard which uses `Object.hasOwn` to ensure the provided `obj` has all
 * of the provided `keys` as own-properties.
 */
export const hasKeys = <Obj extends Record<PropertyKey, unknown>, Keys extends Array<PropertyKey>>(
  obj: Obj,
  keys: Keys
): obj is Obj & Record<Keys[number], Obj[Keys[number]]> => {
  return keys.every((key) => Object.hasOwn(obj, key));
};
